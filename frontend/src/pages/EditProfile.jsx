import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { editUser,reset } from '../features/auth/authSlice'
// import { FaUser} from 'react-icons/fa'
import Spinner from '../components/Spinner'

const EditProfile = ({data}) => {
    console.log(data)
    
    const [formData, setFormData] = useState({
        id: data._id,
        name: data.name,
        email : data.email,
        phone: data.phone,
        // password : '',
    })
    // setFormData(data);
    // const [setInput, setpostData] = useState([]);
    // setpostData(data)

    const {id,name,email, phone} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
    //   if (isSuccess || user) {
    //     navigate('/')
    //   }
  
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
            name,
            email,
            phone
          }
          console.log(userData)
      
          dispatch(editUser(userData))
    }

    if (isLoading) {
        return <Spinner />
      }

  return (
    <div>
        <h1>Edit Profile</h1>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your Name" onChange={onChange}/>
                    <label>Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your Email" onChange={onChange}/>
                    <label>Phone</label>
                    <input type="number" className="form-control" id="phone" name="phone" value={phone} placeholder="Enter your phone number" onChange={onChange}/>
                    {/* <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" />
                    <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirm Password" /> */}
                </div>
                <div className="form-group">
                    <button className='btn btn-block' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </div>
  )
}

export default EditProfile