import http from '@/utils/HTTP'

const getCategories = (params) => {
    return http.get(`/categories`,{
        params:{
            ...params
        }
    })
}

const addCategory = (params) => {
    return http.post(`/categories`,{
        ...params
    })
}

const getCategory = (id) => {
    return http.get(`/categories/${id}`)
}

const updateCategory = (params) => {
    return http.put(`/categories/${params.id}`,params)
}

const deleteCategory = (id) => {
    return http.delete(`/categories/${id}`)
}

export default{
    getCategories,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory
}