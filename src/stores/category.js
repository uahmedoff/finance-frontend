import { defineStore } from 'pinia'
import http from '@/utils/HTTP'

export const useCategoryStore = defineStore({
    id: 'category',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        categories: null,
        pagination: null,
        currentCategory: {
            id: null,
            wallet: null,
            name: null,
            icon: null,
            color: null,
            bgcolor: null,
            type: null,
            parent_id: null,
        },
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getCategories(params){
            this.isLoading = true;
            try{
                const response = (await http.get(`categories`,{
                    params:{
                        ...params
                    }
                })).data;
                this.categories = response.data;
                this.pagination = response.meta;
                this.isLoading =false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading =false
            }
        },

    }
})