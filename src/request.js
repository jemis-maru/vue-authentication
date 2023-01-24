import axios from "axios";
import router from "./router";

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_DATABASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.url = config.url + "?auth="+token;
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });



//Add a response interceptor

axiosInstance.interceptors.response.use((response) => {
    return response
}, function (error) {
    console.log(error);
    const originalRequest = error.config;

    if (error?.response?.status === 401 && originalRequest.url === 
        'https://securetoken.googleapis.com/v1/token') {
        router.push('/login');
        return Promise.reject(error);
    }

    if(error.response.status === 401 && !localStorage.getItem('refresh_token')) {
            router.push('/login');
            return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {

        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refresh_token');
        return axios.post('https://securetoken.googleapis.com/v1/token?key=' + process.env.VUE_APP_API_KEY,
            {
                    "grant_type": "refresh_token",
                    "refresh_token": refreshToken
            })
            .then(res => {
                if (res.status === 200) {
                        localStorage.setItem("token", res.data.idToken);
                        localStorage.setItem("refresh_token", res.data.refreshToken);
                        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                        return axiosInstance(originalRequest);
                }
            })
    }
    return Promise.reject(error);
});

export default axiosInstance;