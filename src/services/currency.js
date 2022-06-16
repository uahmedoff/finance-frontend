import http from '@/utils/HTTP'

const getCurrencies = (params) => {
    return http.get(`/currencies`,{
        params:{
            ...params
        }
    })
}

const addCurrency = (params) => {
    return http.post(`/currencies`,{
        ...params
    })
}

const getCurrency = (id) => {
    return http.get(`/currencies/${id}`)
}

const updateCurrency = (params) => {
    return http.put(`/currencies/${params.id}`,params)
}

const deleteCurrency = (id) => {
    return http.delete(`/currencies/${id}`)
}

export default{
    getCurrencies,
    addCurrency,
    getCurrency,
    updateCurrency,
    deleteCurrency
}