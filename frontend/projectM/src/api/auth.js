import axios from 'axios';

const api = axios.create({
  baseURL : 'http://localhost:3000/api',
  withCredentials : true,

});

export const loginUser = (data)=>{
  return api.post('/auth/login', data);
}

export const registerUser = (data)=>{
  return api.post('/auth/register', data);
}

export const logoutUser = (data)=>{
  return api.post('/auth/logout');
}

export const initiateGoogleAuth = ()=>{
  window.location.href = 'http:localhost:3000/api/auth/google';
};