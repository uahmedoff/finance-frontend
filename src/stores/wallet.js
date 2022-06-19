import { defineStore } from 'pinia'
import http from '@/utils/HTTP'

export const useWalletStore = defineStore({
    id: 'wallet',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        wallets: null,
        pagination: null,
        currentWallet: {
            id: null,
            name: null,
            project_api_url: null,
            currency_id: null,
            firm_id: null,
            parent_id: null,
            categories: [
                {
                    name: null,
                    icon: null,
                    color: '#000',
                    bgcolor: '#fff',
                    type: null,
                }
            ],
            users: []
        },
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getWallets(params){
            this.isLoading = true;
            try{
                const response = (await http.get(`wallets`,{
                    params:{
                        ...params
                    }
                })).data;
                this.wallets = response.data;
                this.isLoading =false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading =false
            }
        },

        async addWallet(){
            this.isSubmitting = true
            try{
                await http.post(`wallets`,this.currentWallet)
                this.isSubmitting = false
                this.currentWallet = {
                    id: null,
                    name: null,
                    project_api_url: null,
                    currency_id: null,
                    firm_id: null,
                    parent_id: null,
                    categories: [
                        {
                            name: null,
                            icon: null,
                            color: '#000',
                            bgcolor: '#fff',
                            type: null,
                        }
                    ],
                    users: []
                }
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isSubmitting =false
            }
        },
        
        async getWallet(id){
            this.isLoading = true;
            this.currentWallet = null;
            try{
                const response = (await http.get(`wallets/${id}`)).data;
                this.currentWallet = response.data;
                this.isLoading =false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading =false
            }
        },

        async updateWallet(){
            this.isLoading = true;
            try{
                const response = (await http.put(`wallets/${this.currentWallet.id}`,this.currentWallet));
                this.currentWallet = {
                    id: null,
                    name: null,
                    project_api_url: null,
                    currency_id: null,
                    firm_id: null,
                    parent_id: null,
                    categories: [
                        {
                            name: null,
                            icon: null,
                            color: '#000',
                            bgcolor: '#fff',
                            type: null,
                        }
                    ],
                    users: []
                },
                this.isLoading = false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading = false
            }
        },

        async deleteWallet(user_id){
            this.isLoading = true
            this.validationErrors = null
            try {
                await http.delete(`wallets/${user_id}`)
                this.isLoading = false
            } 
            catch (error) {
                this.isLoading = false
                this.validationErrors = error.response.data.errors
            }
        }
    }
})
