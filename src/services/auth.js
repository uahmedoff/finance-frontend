import http from '@/utils/HTTP'

const login = (credentials) => {
    return http.post(`/auth/login`,credentials);
}

const getCurrentUser = () => {
    return http.post(`/auth/me`)
}

const updateCurrentUser = (params) => {
    return http.put(`/auth/update`,params)
}

export default{
    login,
    getCurrentUser,
    updateCurrentUser
}