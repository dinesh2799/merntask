


import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { editUser,reset} from '../features/auth/authSlice'
// import { FaUser} from 'react-icons/fa'
import Spinner from '../components/Spinner'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const EditProfile = ({data}) => {
  const {userdata} =useSelector((state) => state.auth)
  console.log("DATA",userdata)
    const [formData, setFormData] = useState({
        id: data._id,
        name: data.name,
        email : data.email,
        phone: data.phone,
        gender: data.gender,
        address: data.address,
        dob: data.dob,
        // password : '',
    })

    // setFormData(data);
    // const [setInput, setpostData] = useState([]);
    // setpostData(data)
    
    const [dob, setDate] = useState(new Date(data.dob));
    const {id,name,email, phone, gender, address} = formData 

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
            name,
            email,
            phone,
            gender,
            address,
            dob
          }
          console.log('User:',userData)
      
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
                    <label>Name<span style={{color: "red"}}>*</span></label>
                    <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your Name" onChange={onChange}/>
                    <label>Email<span style={{color: "red"}}>*</span></label>
                    <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your Email" onChange={onChange}/>
                    <label>Phone<span style={{color: "red"}}>*</span></label>
                    <input type="number" className="form-control" id="phone" name="phone" value={phone} placeholder="Enter your phone number" onChange={onChange}/>
                    <label>Date of Birth</label>
                    <DatePicker
                        selected={dob}
                        value={dob}
                        onChange={(date) => setDate(date)}
                        // onClickOutside={this.datePickerValue}
                        // maxDate={new Date()}
                        dateFormat="dd-MM-yyyy"
                        yearDropdownItemNumber={80}
                        scrollableYearDropdown={true}
                        showYearDropdown
                        showMonthDropdown
                        isClearable
                    />
                    <label>Gender</label>
                    <select className="form-control" id="gender" name="gender" value={gender} onChange={onChange}>
                      <option>SELECT</option>
                      <option  value='male'>Male</option>
                      <option  value='female'>Female</option>
                    </select>
                    <label>Address</label>
                    <input type="text" className="form-control" id="address" name="address" value={address} placeholder="Enter your Address" onChange={onChange}/>
                    {/* <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" />
                    <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirm Password" /> */}
                </div>
                <div className="form-group">
                  {!name || !email || !phone ? <span style={{color: "red"}}>Enter all the required fields</span> : 
                    <button className='btn btn-block' type='submit'>
                        Submit
                    </button>
                    }
                </div>
            </form>
        </section>
    </div>
  )
}

// const [startDate, setStartDate] = useState(new Date());
//   return (
//     <DatePicker
//       selected={startDate}
//       onChange={(date) => setStartDate(date)}
//       isClearable
//       placeholderText="I have been cleared!"
//     />

export default EditProfile