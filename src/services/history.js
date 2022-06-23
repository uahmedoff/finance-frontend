import http from '@/utils/HTTP'

const getAll = (params) => {
    return http.get(`/history`,{
        params:{
            ...params
        }
    })
}

export default{
    getAll
}