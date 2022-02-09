import axios from 'axios';
import { MAIN_URL } from './Url';
let token = sessionStorage.getItem('_token');

//login
export function registerUser(formData) {
    console.log(formData)
    return axios.post(`${MAIN_URL}blog/register`, formData);
}
export function socialloggin(data) {
    return axios.post(`${MAIN_URL}blog/sociallogin`, data);
}

export function loginUser(data) {
    return axios.post(`${MAIN_URL}blog/login`, data);
}
export function authentication(token) {
    return axios.get(`${MAIN_URL}neostore/loginfirst`, {
        headers: { "authorization": `Bearer ${token}` }
    });
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
export function createBlog(formData) {
    // console.log(data)
    console.log(formData)
    return axios.post(`${MAIN_URL}blog/addblog`, formData);
}
export function getBlogdata(email) {
    console.log(email)
    return axios.get(`${MAIN_URL}blog/getblogdata/${email}`);
}

export function getAllblogs() {
    return axios.get(`${MAIN_URL}blog/allblogs`)
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
