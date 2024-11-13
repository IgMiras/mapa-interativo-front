import { io } from 'socket.io-client';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const socket = io(backendUrl); // Altere para a URL do seu backend

export default socket;
