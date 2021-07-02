import axios from 'axios';

const API = axios.create({baseURL: 'http://10.0.2.2/Petsmalu'});

export const register = (formData, petFormData) =>
  API.post('/register.php', {...formData, ...petFormData});

export const login = formData => API.post('/login.php', formData);

export const vetLogin = formData => API.post('/loginVet.php', formData);

export const verify = formData => API.post('/verify.php', formData);

export const getAllVets = () => API.get('/getAllVets.php');

export const getAllUserPets = user_id =>
  API.post('/getUserPets.php', {user_id});

export const createAppointment = formData =>
  API.post('/createAppointment.php', formData);

export const getAllUserAppointments = user_id =>
  API.post('/getAllUserAppointments.php', {user_id});

export const getAllVetAppointments = vet_id =>
  API.post('/getAllVetAppointments.php', {vet_id});

export const getAppointmentsByStatus = data =>
  API.post('/getAppointmentsByStatus.php', data);

export const updateAppointmentStatus = data =>
  API.post('/updateAppointmentStatus.php', data);

export const createPost = data => API.post('/createPost.php', data);

export const getAllPosts = () => API.get('/getAllPosts.php');

export const updatePost = data => API.post('/updatePost.php', data);

export const deletePost = post_id => API.post('/deletePost.php', {post_id});
