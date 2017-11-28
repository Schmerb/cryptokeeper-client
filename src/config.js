// API
export const API_BASE_URL = 
    process.env.REACT_APP_API_BASE_URL || "http://192.168.5.38:7000/api";
export const HEROKU_BASE_URL = 
    process.env.REACT_APP_API_BASE_URL.slice(0,-3);

// Port
export const PORT = process.env.PORT || 8080;

