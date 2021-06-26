import axios from 'axios';

const API = axios.create({baseURL: 'http://10.0.2.2/Petsmalu'});

export const register = (formData, petFormData) =>
  API.post('/register.php', {...formData, ...petFormData});
export const login = formData => API.post('/login.php', formData);
export const getAllVets = () => API.get('/getAllVets.php');
export const getAllUserPets = user_id =>
  API.post('/getUserPets.php', {user_id});
