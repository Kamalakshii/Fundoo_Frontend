import axios from "axios";
export function userLogin(data)
{
    return axios.post('/login',data)
}




export function userRegister(data) {
    console.log("dataaaaaaaaa=>",data);
  
    return axios.post('/registration',data)
}


// export function userRegister(data)
// {
//     console.log("dataaaaaaaaa=>",data);
    
//     return axios.post('/registration',data)
// }
export function forgotPassword(data)
{
    return axios.post('/forgotPassword',data)
}
export function resetPassword(password, token) {
    return axios.post(`/resetPassword/${token}`, 
         password,
   {
        headers: {
            'token': token
        }
    })
}