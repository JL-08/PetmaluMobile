import axios from 'axios';

const API = axios.create({baseURL: 'http://petsmalu.xyz/mobile'});

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

export const checkAppointmentValidity = data =>
  API.post('/checkAppointmentValidity.php', data);

export const createPost = data => API.post('/createPost.php', data);

export const getAllPosts = () => API.get('/getAllPosts.php');

export const updatePost = data => API.post('/updatePost.php', data);

export const deletePost = post_id => API.post('/deletePost.php', {post_id});

export const getUser = user_id => API.post('/getUser.php', {user_id});

export const updateUserDetails = formData =>
  API.post('/updateUserDetails.php', formData);

export const updateUserPassword = formData =>
  API.post('/updateUserPassword.php', formData);

export const updatePet = formData => API.post('/updatePet.php', formData);

export const getPet = id => API.post('/getPet.php', {id});

export const registerPet = formData => API.post('/registerPet.php', formData);

export const getAllFaqs = () => API.get('/getAllFaqs.php');
