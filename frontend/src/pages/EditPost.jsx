


import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { editUser,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {getPosts, editPost } from '../features/posts/postSlice'

const EditPost= ({data}) => {
    const [formData, setFormData] = useState({
        id: data._id,
        text: data.text,
    })

    // setFormData(data);
    // const [setInput, setpostData] = useState([]);
    // setpostData(data)
    const {id,text} = formData 

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      if (isSuccess ) {
        navigate('/')
      }
  
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
  
    const onChange= (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
            
        }))
        // setpostData({...setInput, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            id,
            text,
          }
          console.log('POST:',userData,id)
      
          dispatch(editPost(userData))
    }

    // const check = () => {
    //     console.log("cancel")
    // }

    

    if (isLoading) {
        return <Spinner />
      }

  return (
    <div>
        <h3>Edit Post</h3>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    {/* <label>Post<span style={{color: "red"}}>*</span></label> */}
                    <input type="text" className="form-control" id="text" name="text" value={text} placeholder="Enter any text" onChange={onChange}/>
                </div>
                <div className="form-group">
                  {!text ? <span style={{color: "red"}}>Enter all the required fields</span> : 
                    <button className='btn btn-block' type='submit'>
                        Submit
                    </button>
                    }
                    {/* <button className='btn btn-block' onClick={()=>showEdit()} type='button' style={{background: "red"}}>Cancel</button> */}
                </div>
            </form>
        </section>
    </div>
  )
}

export default EditPost