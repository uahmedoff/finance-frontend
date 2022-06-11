import http from '@/utils/HTTP'

const login = (credentials) => {
    return http.post(`/auth/login`,credentials);
}

const getCurrentUser = () => {
    return http.post(`/auth/me`);
}

export default{
    login,
    getCurrentUser
}