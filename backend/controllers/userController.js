const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler')
const User = require('../models/userModel')
const emailValidator = require('deep-email-validator')
 
async function isEmailValid(email) {
 return emailValidator.validate(email)
}


const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

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
 
    if (valid){
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
                        pass: 'Deadpool2799'
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
    const {_id,name,email,phone} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,email,phone
    })
    // res.json({message:'register User'})
})

const editUser = asynchandler(async(req,res) =>{
    if(req.user.id !== req.params.id)
    {
        res.status(400)
        throw new Error('Not authorized');
    } 
    const updated = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })

    res.status(200).json({
        name:updated.name,email:updated.email,phone:updated.phone
    })
})


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}





module.exports={
    registerUser,loginUser,getUser,editUser
}