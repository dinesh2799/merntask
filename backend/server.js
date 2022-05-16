const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const path = require('path')
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/posts',require('./routes/postRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

//serve frontend

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
}
else{
    app.get('/',(req,res) => res.send('Please set to production'))
}
app.use(errorHandler)

app.listen(port,() => console.log(`Server started on port ${port}`))