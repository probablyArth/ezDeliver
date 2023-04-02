import axios from 'axios';
import { BASE_URL } from './axiosClient';
import axiosInstance from './axiosClient';
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
    .catch (err => {console.log(err); alert(err.response.data.message); location.href = '/login'})

export const signin = (phone: String, otp: String) =>
    axios.post(BASE_URL+'/auth/login', {
        phone, otp
    })
    .then (data => data.data)
    .catch (err => { console.log(err); alert(err.response.data.message)})


export const getVehicle = () => {
    return axiosInstance.get(BASE_URL+'/vehicle')
    .then(data => data.data)
    .catch (err => err)
}

export const createOrder = (from: String, to:String, itemName: String, itemQuantity:Number, vehicle:String, distance: Number) => {
    return axiosInstance.post(BASE_URL+'/delievery', {
        from, to, vehicleId:vehicle, items: [{ name: itemName, weight: itemQuantity }], distance
    })
    .then(data => data.data)
    .catch(err => err)
}

export const getOrders = () => {
    return axiosInstance.get(BASE_URL+'/delievery')
    .then(data => data.data)
    .catch (err => err)
}
