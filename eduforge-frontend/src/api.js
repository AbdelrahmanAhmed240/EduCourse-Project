import axios from 'axios';

const getBaseURL = () => {
  const productionURL = 'https://educourse-project-production.up.railway.app/api'; 
  if (window.location.hostname !== 'localhost') {
    return productionURL;
  }
  return 'http://localhost:5000/api';
};

const API = axios.create({ 
  baseURL: getBaseURL() 
});

API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        try {
            const parsed = JSON.parse(profile);
            req.headers.Authorization = `Bearer ${parsed.token}`;
        } catch (error) {
            console.error("Token parsing failed:", error);
        }
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

export const login = (data) => API.post('/auth/login', data);
export const signup = (data) => API.post('/auth/signup', data);
export const fetchCourses = () => API.get('/courses');
export const saveCourse = (data) => API.post('/courses', data);
export const fetchRemainingCreations = () => API.get('/courses/remaining');