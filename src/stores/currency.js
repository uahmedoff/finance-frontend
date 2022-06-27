import { defineStore } from 'pinia'
import currencyService from '@/services/currency'

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
                const response = (await currencyService.getCurrencies(params)).data;
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
