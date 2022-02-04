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






