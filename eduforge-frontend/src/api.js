import axios from 'axios';

// Safely handles the base URL without checking process.env directly to avoid breaking Vite/React builds
const getBaseURL = () => {
  try {
    // If you use Create-React-App environment variables
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_BACKEND_URL) {
      return process.env.REACT_APP_BACKEND_URL;
    }
  } catch (e) {}

  // Default fallback for your local server
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