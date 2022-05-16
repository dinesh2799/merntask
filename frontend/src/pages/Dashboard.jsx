// import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import PostForm from '../components/PostForm'
import Spinner from '../components/Spinner'
import {getPosts, reset} from '../features/posts/postSlice'
import PostItem from '../components/PostItem'
// import EditProfile from './EditProfile'
function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} =useSelector((state) => state.auth)
    const {posts, isLoading, isError, message} = useSelector((state)=> state.posts)
 
    useEffect(()=>{

        if(isError){
            console.log(message)
        }

        if(user)
        {
            dispatch(getPosts())
        }

        if(!user){
            navigate('/login')
        }

        // 
        return()=>{
            dispatch(reset()
            )
        }

    },[user, navigate, isError, message, dispatch])

    if(isLoading)
    {
        return <Spinner />
    }

  return (
    <>
    <section className='heading'>
        <h1>Welcome {user && user.name} </h1>
        <p>Posts</p>
        <div>
            
        {/* <EditProfile data={user}/> */}
        </div>
        
    </section>
    
    <PostForm />
    <section className='content'>
        {posts.length >0 ? (
            <div className="goals">
                {posts.map((post) => (
                    <PostItem key = {post._id} post={post} />
                ))}
            </div>
        ) : (<h3>No Posts</h3>)}
    </section>
    </>
  )
}

export default Dashboard