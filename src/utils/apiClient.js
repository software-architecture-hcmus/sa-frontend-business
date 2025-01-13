import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../const/LocalStorage";
import RouterUrl from "../const/RouterUrl";
import { signOut } from "firebase/auth";
import { authFirebase } from "./firebase";

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

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Remove tokens from local storage
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            // Optionally sign out from Firebase
            signOut(authFirebase);
            // Redirect to login page
            window.location.href = RouterUrl.LOGIN;
        }
        return Promise.reject(error);
    }
);

//TODO: Add interceptor to refresh token

export default apiClient;

