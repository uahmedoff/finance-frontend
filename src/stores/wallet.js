import { defineStore } from 'pinia'
import walletService from '@/services/wallet'

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
            balance: null,
            monthly_cash_flow: null,
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
                const response = (await walletService.getWallets(params)).data;
                this.wallets = response.data;
                this.pagination = response.meta;
                this.isLoading =false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading =false
            }
        },

        async addWallet(){
            this.validationErrors = null;
            this.isSubmitting = true
            try{
                await walletService.addWallet(this.currentWallet)
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
                const response = (await walletService.getWallet(id)).data;
                this.currentWallet = response.data;
                this.isLoading =false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading =false
            }
        },

        async updateWallet(){
            this.validationErrors = null;
            this.isLoading = true;
            try{
                const response = (await walletService.updateWallet(this.currentWallet));
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

        async deleteWallet(wallet_id){
            this.isLoading = true
            this.validationErrors = null
            try {
                await walletService.deleteWallet(wallet_id)
                this.isLoading = false
            } 
            catch (error) {
                this.isLoading = false
                this.validationErrors = error.response.data.errors
            }
        }
    }
})
