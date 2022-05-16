import React from 'react'
import { useDispatch } from 'react-redux'
import {deletePost} from '../features/posts/postSlice'


const PostItem = ({post}) => {
    const dispatch = useDispatch()
  return (
    <div className='goal'>
      <h2>{post.text}</h2>
        <div>
            {new Date(post.createdAt).toLocaleString('en-US')}
        </div>
      
        <button onClick={()=> dispatch(deletePost(post._id))} className="close">X</button>
        
    </div>
  )
}

export default PostItem