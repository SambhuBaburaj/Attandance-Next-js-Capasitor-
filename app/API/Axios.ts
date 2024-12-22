import axios from 'axios';

// Base URL configuration
const BASE_URL = 'http://localhost:8000/api/v1/';

// Create axios instance with default config
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
});

// Request interceptor to add token and handle headers
instance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const token = localStorage.getItem('token');

    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401 && token) {
        // Save FCM token if it exists
        const fcmToken = localStorage.getItem('fcmToken');
        
        // Clear all localStorage items
        localStorage.clear();
        
        // Restore FCM token if it existed
        if (fcmToken) {
          localStorage.setItem('fcmToken', fcmToken);
        }

        // Redirect to login page
        if (window) {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// API methods using the configured axios instance
export const API = {
  get: <T>(url: string, config = {}) => {
    return instance.get<T>(url, config);
  },
  
  post: <T>(url: string, data = {}, config = {}) => {
    return instance.post<T>(url, data, config);
  },
  
  put: <T>(url: string, data = {}, config = {}) => {
    return instance.put<T>(url, data, config);
  },
  
  delete: <T>(url: string, config = {}) => {
    return instance.delete<T>(url, config);
  },
};

export default instance;