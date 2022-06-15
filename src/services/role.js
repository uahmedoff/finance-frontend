import http from '@/utils/HTTP'

const getRoles = (params) => {
    return http.get(`/roles`,{
        params:{
            ...params
        }
    })
}

const getRole = (id) => {
    return http.get(`/roles/${id}`)
}

const getRolePermissions = (id) => {
    return http.get(`/roles/${id}/permissions`)
}

const putPermissionsToRole = (id,params) => {
    return http.put(`/roles/${id}/permissions`,params)
}

const getPermissions = () => {
    return http.get(`/permissions`)
}

const getPermission = (id) => {
    return http.get(`/permissions/${id}`)
}

export default{
    getRoles,
    getRole,
    getRolePermissions,
    putPermissionsToRole,
    getPermissions,
    getPermission
}