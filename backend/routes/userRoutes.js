const express = require('express')
const router = express.Router()
const {registerUser,loginUser,getUser, editUser, getAllUsers} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/user',protect,getUser)
router.put('/edit/:id',protect,editUser)
// router.post('/profile',profilePicture)
router.get('/employee',protect,getAllUsers)

module.exports = router
