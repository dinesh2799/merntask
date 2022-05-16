import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register,reset } from '../features/auth/authSlice'
import { FaUser} from 'react-icons/fa'
import Spinner from '../components/Spinner'
function Register() {
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        phone : '',
        password : '',
        password2 : ''
    })

    const {name, email, phone, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      if (isSuccess || user) {
        navigate('/')
      }
  
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange= (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do not match')
          } else {
            const userData = {
              name,
              email,
              phone,
              password,
            }
      
            dispatch(register(userData))
          }
    }

    if (isLoading) {
        return <Spinner />
      }

  return (
    <>
        <section className='heading'> 
            <h1>
                <FaUser />Register
            </h1>
            <p>Please enter all the details</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your Name" onChange={onChange}/>
                    <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your Email" onChange={onChange}/>
                    <input type="number" className="form-control" id="phone" name="phone" value={phone} placeholder="Enter your phone number" onChange={onChange}/>
                    <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange}/>
                    <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirm Password" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <button className='btn btn-block' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register