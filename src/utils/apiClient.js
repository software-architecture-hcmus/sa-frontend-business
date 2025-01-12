import axios from "axios";
import { ACCESS_TOKEN } from "../const/LocalStorage";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//TODO: Add interceptor to refresh token

export default apiClient;

