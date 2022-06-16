import http from '@/utils/HTTP'

const getFirms = (params) => {
    return http.get(`/firms`,{
        params:{
            ...params
        }
    })
}

const addFirm = (params) => {
    return http.post(`/firms`,{
        ...params
    })
}

const getFirm = (id) => {
    return http.get(`/firms/${id}`)
}

const updateFirm = (params) => {
    return http.put(`/firms/${params.id}`,params)
}

const deleteFirm = (id) => {
    return http.delete(`/firms/${id}`)
}

export default{
    getFirms,
    addFirm,
    getFirm,
    updateFirm,
    deleteFirm
}