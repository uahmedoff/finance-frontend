import http from '@/utils/HTTP'

const getTransactions = (params) => {
    return http.get(`/transactions`,{
        params:{
            ...params
        }
    })
}

const addTransaction = (params) => {
    return http.post(`transactions`,params)
}

const deleteTransaction = (transaction_id) => {
    return http.delete(`transactions/${transaction_id}`)
}

export default{
    getTransactions,
    addTransaction,
    deleteTransaction
}