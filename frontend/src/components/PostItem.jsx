import React from 'react'
import { useDispatch } from 'react-redux'
import {deletePost} from '../features/posts/postSlice'
import EditPost from '../pages/EditPost'
import { useState } from 'react'

const PostItem = ({post}) => {
    const dispatch = useDispatch()
    const [showEditform,setshowEditform] = useState(false)
    const showEdit = () => {
      setshowEditform(!showEditform)
    }

  return (
    <div className='goal'>
        {/* <h2>{post.text}</h2>
        <div>
            {new Date(post.createdAt).toLocaleString('en-US')}
        </div> */}
        
        {
        showEditform ?
        <><EditPost data={post}/> <button  onClick={()=>showEdit()} className='close' style={{color: "red" ,float: "right"}}>X</button></>  
        : 
        <>
        <h2>{post.text}</h2>
        <div>
            {new Date(post.createdAt).toLocaleString('en-US')}
        </div>
        <div className='goal'>
        <button onClick={showEdit} style={{color: "green"}} className='btn btn-block'>Edit</button>
        <button onClick={()=> dispatch(deletePost(post._id))} style={{color: "red"}} className="btn btn-block">Delete</button>
        </div>
        
        
        </>
        }
        
        
        
    </div>
  )
}

export default PostItem