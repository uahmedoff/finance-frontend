import http from '@/utils/HTTP'

const getWallets = (params) => {
    return http.get(`/wallets`,{
        params:{
            ...params
        }
    })
}

const addWallet = (params) => {
    return http.post(`wallets`,params)
}

const getWallet = (id) => {
    return http.get(`wallets/${id}`)
}

const updateWallet = (params) => {
    return http.put(`/wallets/${params.id}`,params)
}

const deleteWallet = (wallet_id) => {
    return http.delete(`wallets/${wallet_id}`)
}

export default{
    getWallets,
    addWallet,
    getWallet,
    updateWallet,
    deleteWallet
}