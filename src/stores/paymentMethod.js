import { defineStore } from 'pinia'
import paymentMethodService from '@/services/paymentMethod'

export const usePaymentMethodStore = defineStore({
    id: 'paymentMethod',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        paymentMethods: null,
        pagination: null,
        currentPaymentMethod: {
            id: null,
            name: null,
        },
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getPaymentMethods(params){
            this.isLoading = true;
            try{
                const response = (await paymentMethodService.getPaymentMethods(params)).data;
                this.paymentMethods = response.data;
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