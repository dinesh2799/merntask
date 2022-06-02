const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler')
const User = require('../models/userModel')
const emailValidator = require('deep-email-validator')
var passwordValidator = require('password-validator')
const validatePhoneNumber = require('validate-phone-number-node-js');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


async function isEmailValid(email) {
 return emailValidator.validate(email)
}


const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function(req, file, cb) {   
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// let upload = multer({ storage, fileFilter });

// const profilePicture = asynchandler(async(req,res)=>{

// })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'images');
    },
    filename: function (req, file, cb) {
       cb(null, Date.now() + '-' + file.originalname);
    }
 });
 var upload = multer({ storage: storage });
//  app.post('/api/image-upload', upload.single('image'),(req, res) => {
//     const image = req.image;
// res.json({message:'register User'})
//       res.send(apiResponse({message: 'File uploaded successfully.', image}));
//   });
//   function apiResponse(results){
//       return JSON.stringify({"status": 200, "error": null, "response": results});
//   }
// const profile = async()


const registerUser = asynchandler(async(req,res) => {
    const {name,email,phone,password} = req.body
    if(!name|| !email || !phone || !password)
    {
        res.status(400)
        throw new Error('Fields are missing')
    }

    const userExists = await User.findOne({email})
    if(userExists)
    {
        res.status(400)
        throw new Error('User Already Exists')
    }

    const {valid, reason, validators} = await isEmailValid({email})
    // var validator = require("node-email-validation");
 
    // const valid = validator.is_email_valid({email});
    if (valid || !valid){
        var schema = new passwordValidator();
        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        // .is().not().oneOf(['Passw0rd', 'Password123']) // Blacklist these values
        if(schema.validate(password) === false){
            res.status(400)
            throw new Error('Password Rules: Minimum length 8 & Must have uppercase and lowercase letters & Must have at least 1 digit & Should not have spaces')
        }

        if(validatePhoneNumber.validate(phone) === false)
        {
            res.status(400)
            throw new Error(' Enter valid phone number')
        }

        console.log("Valid")
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
    
        const user = await User.create({
            name,
            email,phone,
            password:hashedPassword
        })
        if(user){

            var transporter = nodemailer.createTransport(
                {
                    service: 'gmail',
                    auth:{
                        user: 'dineshchevvakula24@gmail.com',
                        pass: 'Dinesh@2799'
                    }
                }
            );
            
            // point to the template folder
            const handlebarOptions = {
                viewEngine: {
                    partialsDir: path.resolve('./backend/views/'),
                    defaultLayout: false,
                },
                viewPath: path.resolve('./backend/views/'),
            };
            
            // use a template file with nodemailer
            transporter.use('compile', hbs(handlebarOptions))
            
            
            var mailOptions = {
                from: '"MERN APP" <registration@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Registration Successful',
                template: 'email', // the name of the template file i.e email.handlebars
                context:{
                    name: user.name, // replace {{name}} with Adebola
                    company: 'MERN APP' // replace {{company}} with My Company
                }
            };
            
            // trigger the sending of the E-mail
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                
                console.log('Message sent: ' + info.response);
            });
            
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                gender:'',
                address:'',
                dob:'2022-05-18',
                token: generateToken(user._id)
            })
        }
        else{
            res.status(400)
            throw new Error('INVALID user data')
        }
    
        res.json({message:'register User'})
    }
    else{
        res.status(400)
            throw new Error('INVALID EMAIL ADDRESS')
    }
})

const loginUser = asynchandler(async(req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password)))
    {
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            gender:user.gender,
            address:user.address,
            dob:user.dob,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('INVALID user data')
    }

    res.json({message:'register User'})
})

const getUser = asynchandler(async(req,res) => {
    const {_id,name,email,phone,gender,address,dob} = await User.findById(req.user.id)
    

    res.status(200).json({
        id: _id,
        name,email,phone,gender,address,dob
    })
    // res.json({message:'register User'})
})

// User.find({}, 'firstName lastName picture', function(error, data) {
// if (error) {
//     return res.status(500).send({
//         msg: 'Error while finding records',
//         data: []
//     })
// } else {
//     return res.send(200).send({
//             msg: 'recods found',
//             data: data
//         })
//   }
// });

const getAllUsers = asynchandler(async(req,res) => {
    // const users = await User.find().populate()
const users = await User.find({ id: { $ne: req.user.id } }).select([
    "name",
    "email",
    "phone"
]);
    
    // const users=1
    res.status(200).json(users)
})  

// const editUser = asynchandler(upload.single('photo'),async(req,res) =>{
    const editUser = asynchandler(async(req,res) =>{
    console.log(req)
    if(req.user.id !== req.params.id)
    {
        res.status(400)
        throw new Error('Not authorized');
    } 
    const userData = await User.findById(req.user.id);
    if(!req.body.name|| !req.body.email || !req.body.phone )
    {
        res.status(400)
        throw new Error('Fields are missing')
    }
    // if(req.body.dob)
    // {
    //     const date = require('date-and-time')
    //     req.body.dob =  date.format(req.body.dob,'dd-MM-yyyy');
    // }
    if(req.body.email !== userData.email){
        const {valid, reason, validators} = await isEmailValid(req.body.email)
        if(valid)
        {
            console.log("Valid email")
        }
        else{
            // req.body.email = userData.email
            res.status(400)
            throw new Error('Invalid Email Address');
        }
    }
    if(req.body.phone !== userData.phone )
        {
            if(validatePhoneNumber.validate(req.body.phone) === false)
            {
                // req.body.phone = userData.phone
                res.status(400)
                throw new Error(' Enter valid phone number')
                
            }
        }
    
    const updated = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })

    res.status(200).json({
        name:updated.name,email:updated.email,phone:updated.phone,gender:updated.gender,address:updated.address,dob:updated.dob
    })
})


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '1d',
    })
}





module.exports={
    registerUser,loginUser,getUser,editUser,getAllUsers
}