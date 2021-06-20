import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/api/v1'});

export const register = formData => API.post('/register.php', formData);
export const login = formData => API.post('/login.php', formData);
