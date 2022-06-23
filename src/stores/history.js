import { defineStore } from 'pinia'
import historyService from '@/services/history'

export const useHistoryStore = defineStore({
    id: 'history',
    state: () => ({
        // isSubmitting: false,
        isLoading: false,
        history: null,
        pagination: null,
        // currentHistory: {
        //     id: null,
        //     name: null,
        // },
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getAll(params){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                const response = (await historyService.getAll(params)).data;
                this.isLoading = false;
                this.history = response.data;
                this.pagination = response.meta;
                this.isLoggedIn = true;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        },
        
    }
})