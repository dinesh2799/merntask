import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { profilePicture,reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
const Profile = () => {
    const [formData, setFormData] = useState(
        {
            file: '',
        }
    );
    const {file} = formData 
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

      const handlePhoto = (e) => {
        setFormData({...formData, file: e.target.files[0]});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('photo', newUser.photo);
        const formData = {
            id: user._id,
            file,
        }
        console.log("Res",user,formData)
        dispatch(profilePicture(formData))
    }

    if (isLoading) {
        return <Spinner />
      }
    
  return (
    <section className="form">
    <form  onSubmit={onSubmit} encType='multipart/form-data'>
        <div className="form-group">
        <label>Upload Image</label>
                    <input 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        name="file"
                        onChange={handlePhoto}
                    />
        </div>
        <div className="form-group">
            <button className='btn btn-block' type='submit'>
                Submit
            </button>
        </div>
    </form>
    </section>
    /* <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

            <input 
                type="submit"
            />
        </form> */
  )
}

export default Profile