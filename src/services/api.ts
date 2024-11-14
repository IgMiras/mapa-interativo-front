import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
import { Occurrence } from '../types';

console.log('Backend URL:', backendUrl);

const api = axios.create({
    baseURL: backendUrl, // Altere para a URL do seu backend
});

export const getOccurrences = () => api.get<Occurrence[]>('/occurrences');
export const createOccurrence = (occurrence: Occurrence) =>
    api.post<Occurrence>('/occurrences/send', occurrence);
