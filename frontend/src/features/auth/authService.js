import axios from "axios"
const API_URL ='/api/users/'
const API_FILE_URL = '/api/file/'

const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
}

// const editUser = async (token) => {
//         const config = {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         }
    
//         const response = await axios.get(API_URL + 'user', config)
//         return response.data
// }

const editUser = async(postData, token, userId) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'edit/' + postData.id, postData, config)
    return response.data
}

const profilePicture = async(postData, token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(API_FILE_URL + 'upload/' + postData.id, postData, config)
    return response.data
}

const getUser = async(token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'user' , config)
    return response.data
}



const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,logout,login,editUser,getUser,profilePicture
}

export default authService