import http from '@/utils/HTTP'

const getUsers = (params) => {
    return http.get(`/users`,{
        params:{
            ...params
        }
    })
}

const addUser = (params) => {
    return http.post(`/users`,{
        ...params
    })
}

const getUser = (id) => {
    return http.get(`/users/${id}`)
}

const updateUser = (params) => {
    return http.put(`/users/${params.id}`,params)
}

const deleteUser = (id) => {
    return http.delete(`/users/${id}`)
}

export default{
    getUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser
}