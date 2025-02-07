import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_END_URL + "/api",
    withCredentials: true, // ✅ Ensure cookies are included
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    if(!config.url.includes("/auth/signin") && !config.url.includes("/auth/signup") && !config.url.includes("/public")) {
    const jwtToken = JSON.parse(localStorage.getItem("auth")).jwtToken;
    if(jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
}
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
