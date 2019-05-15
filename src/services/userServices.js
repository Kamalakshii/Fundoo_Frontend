/******************************************************************************
 *  @Purpose        : To create user services that will send the incoming data 
                    to server and save that data to database and at login, reset
                    password, forgotpassword time fetching correct information 
                    from database.
 *  @file           : userServices.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @version        : v0.1
 *  @since          : 29-03-2019
 ******************************************************************************/
import axios from "axios";
/**
 * 
 * @param {*} data 
 */
export function userLogin(data)
{
    return axios.post('/login',data)
}
export function userRegister(data) {
    //console.log("dataaaaaaaaa=>",data);
    return axios.post('/registration',data)
}
/**
 * 
 * @param {*} data 
 */
export function forgotPassword(data)
{
    return axios.post('/forgotPassword',data)
}
/**
 * 
 * @param {*} token
 */
export function resetPassword(password, token) {
    return axios.post(`/resetPassword/${token}`, 
         password,
   {
        headers: {
            'token': token
        }
    })
}
/**
 * 
 * @param {*} data 
 */
export function uploadProfilePic(data) {
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/setProfilePic',
        data, {
            headers: headers
        }
    )
}