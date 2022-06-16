import { defineStore } from 'pinia'
import firmService from '@/services/firm'

export const useFirmStore = defineStore({
    id: 'firm',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        firms: null,
        pagination: null,
        currentFirm: {
            id: null,
            name: null,
        },
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getFirms(params){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                const response = (await firmService.getFirms(params)).data;
                this.isLoading = false;
                this.firms = response.data;
                this.pagination = response.meta;
                this.isLoggedIn = true;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        },
        
        async addFirm(){
            this.isSubmitting = true;
            this.validationErrors = null;
            try {
                await firmService.addFirm(this.currentFirm);
                this.isSubmitting = false;
                this.currentFirm = {
                    id: null,
                    name: null,
                }
            } 
            catch (error) {
                this.isSubmitting = false;
                this.validationErrors = error.response.data.errors;
            }
        },

        async getFirm(id){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                const response = (await firmService.getFirm(id)).data;
                this.isLoading = false;
                this.currentFirm = response.data;
                this.isLoggedIn = true;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        },

        async updateFirm(){
            this.isSubmitting = true;
            this.validationErrors = null;
            try {
                await firmService.updateFirm(this.currentFirm);
                this.isSubmitting = false;
                this.currentUser = {
                    id: null,
                    name: null
                }
            } 
            catch (error) {
                this.isSubmitting = false;
                this.validationErrors = error.response.data.errors;
            }
        },
        
        async deleteFirm(firm_id){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                await firmService.deleteFirm(firm_id);
                this.isLoading = false;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        }
    }
})