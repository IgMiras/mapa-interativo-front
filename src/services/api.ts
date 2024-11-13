import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log("Backend URL:", backendUrl);

const api = axios.create({
  baseURL: backendUrl, // Altere para a URL do seu backend
});

export default api;
