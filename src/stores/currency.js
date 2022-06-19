import { defineStore } from 'pinia'
import http from '@/utils/HTTP'

export const useCurrencyStore = defineStore({
    id: 'currency',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        currencies: null,
        pagination: null,
        // currentWallet: {
        //     id: null,
        //     code: null,
        //     ccy: null,
        //     ccynm_uz: null,
        //     ccynm_uzc: null,
        //     ccynm_ru: null,
        //     ccynm_en: null,
        // },
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getCurrencies(params){
            this.isLoading = true;
            try{
                const response = (await http.get(`currencies`,{
                    ...params
                })).data;
                this.currencies = response.data;
                this.isLoading =false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading =false
            }
        },

    }
})
