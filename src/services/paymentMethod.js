import http from '@/utils/HTTP'

const getPaymentMethods = (params) => {
    return http.get(`/payment_methods`,{
        params:{
            ...params
        }
    })
}

export default{
    getPaymentMethods
}