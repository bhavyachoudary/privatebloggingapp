import axios from 'axios';
import { MAIN_URL } from './Url';


//login

export function registerUser(data) {
    return axios.post(`${MAIN_URL}blog/register`, data);
}
export function socialloggin(data) {
    return axios.post(`${MAIN_URL}blog/sociallogin`, data);
}

export function loginUser(data) {
    return axios.post(`${MAIN_URL}blog/login`, data);
}

export function sendMailotp(data) {
    return axios.post(`${MAIN_URL}blog/sendmailotp`, data)
}
export function forgotPassword(data) {
    return axios.post(`${MAIN_URL}blog/forgotpassword`, data)
}
export function getProfile(email) {
    return axios.get(`${MAIN_URL}blog/getprofile/${email}`);
}
export function createBlog(data){
    console.log(data)
    return axios.post(`${MAIN_URL}blog/addblog`,data);
}
export function getBlogdata(email) {
    console.log(email)
    return axios.get(`${MAIN_URL}blog/getblogdata/${email}`);
}
export function getAllblogs() {
    return axios.get(`${MAIN_URL}blog/allblogs`);
}
export function getSingleBlog(data) {
    return axios.get(`${MAIN_URL}blog/singleblog/` + data);

}
export function editedBlog(id, data) {
    console.log(id)
    console.log(data)
    return axios.post(`${MAIN_URL}blog/editblog/${id}`, data);

}
export function updProfile(id, data) {
    console.log(data)
    return axios.put(`${MAIN_URL}blog/updprofile/${id}`, data);

}
