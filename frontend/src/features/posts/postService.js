import axios from "axios"

const API_URL = '/api/posts/'

const createPost = async(postData, token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, postData, config)
    return response.data
}

const getPosts = async(token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

const deletePost = async(postId, token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + postId, config)
    return response.data
}

const postService = {
    createPost,getPosts,deletePost
}

export default postService
