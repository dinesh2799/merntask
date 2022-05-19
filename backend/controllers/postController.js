const asynchandler = require('express-async-handler')
const { findById } = require('../models/postModel')

const Post = require('../models/postModel')
const User = require('../models/userModel')

const getPosts =asynchandler( async (req,res) => {
    const posts = await Post.find({user: req.user.id})

    res.status(200).json(posts)
})

const setPost =asynchandler( async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add any text')
    }

    const post = await Post.create(
        {
            text: req.body.text,
            user: req.user.id
        }
    )
    res.status(200).json(post)
})

const updatePost =asynchandler( async (req,res) => {
    const post = await Post.findById(req.params.id)
    
    if(!post)
    {
        res.status(400)
        throw new Error('Post not found')
    }

    // const user = await User.findById(req.user.id)

    if(!req.user)
    {
        res.status(400)
        throw new Error('User not found')
    }

    if(post.user.toString() !== req.user.id)
    {
        res.status(400)
        throw new Error('User not authorized')
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
    const posts = await Post.find({user: req.user.id})

    res.status(200).json(posts)
    // res.status(200).json(updated)
})

const deletePost = asynchandler( async (req,res) => {
    
    const post = await Post.findById(req.params.id)

    if(!post)
    {
        res.status(400)
        throw new Error('Post not found')
    }

    // const user = await User.findById(req.user.id)

    if(!req.user)
    {
        res.status(400)
        throw new Error('User not found')
    }

    if(post.user.toString() !== req.user.id)
    {
        res.status(400)
        throw new Error('User not authorized')
    }


    const deleted = await post.remove()
    res.status(200).json({ id: req.params.id })
})

  

module.exports = {
    getPosts,setPost,updatePost,deletePost
}