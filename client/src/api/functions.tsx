import axios from 'axios';
import { BASE_URL } from './axiosClient';
export const sendOtp = (phone: String) => 
    axios.post(BASE_URL + '/auth/sendOtp', {
        phone
    })
    .then ((data => data.data))
    .catch(error => error)


export const signup = (firstname: String, lastname: String,  phone: String, otp: String) =>
    axios.post(BASE_URL+'/auth/signup', {
        phone, username: firstname+'_'+lastname, otp
    })
    .then (data => data.data)
    .catch (err => err)

export const signin = (phone: String, otp: String) =>
    axios.post(BASE_URL+'/auth/login', {
        phone, otp
    })
    .then (data => data.data)
    .catch (err => { console.log(err); alert(err.response.data.message)})
