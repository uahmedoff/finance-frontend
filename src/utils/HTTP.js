import axios from 'axios';
import { getItem } from '@/helpers/localStorage'

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
});

const createSetAuthInterceptor = options => config => {
    const token = getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
}

const setAuthCb = createSetAuthInterceptor();

http.interceptors.request.use(setAuthCb);

http.interceptors.response.use(
    response => response,
    // errorResponseHandler
);

export default http;