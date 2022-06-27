import { defineStore } from 'pinia'
import transactionService from '@/services/transaction'

export const useTransactionStore = defineStore({
    id: 'transaction',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        transactions: null,
        pagination: null,
        currentTransaction: {
            id: null,
            wallet: null,
            category_id: null,
            category: null,
            payment_method_id: null,
            payment_method: null,
            date: null,
            debit: null,
            image: null,
            note: null,
        },
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getTransactions(params){
            this.isLoading = true;
            try{
                const response = (await transactionService.getTransactions(params)).data;
                this.transactions = response.data;
                this.pagination = response.meta;
                this.isLoading =false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading =false
            }
        },

        async addTransaction(){
            this.isSubmitting = true
            try{
                await transactionService.addTransaction(this.currentTransaction)
                this.isSubmitting = false
                this.currentTransaction = {
                    id: null,
                    wallet: null,
                    category_id: null,
                    category: null,
                    payment_method_id: null,
                    payment_method: null,
                    date: null,
                    debit: null,
                    image: null,
                    note: null,
                }
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isSubmitting =false
            }
        },
        
        // async getTransaction(id){
        //     this.isLoading = true;
        //     this.currentWallet = null;
        //     try{
        //         const response = (await http.get(`wallets/${id}`)).data;
        //         this.currentWallet = response.data;
        //         this.isLoading =false
        //     }
        //     catch(error){
        //         this.validationErrors = error.response.data.errors;
        //         this.isLoading =false
        //     }
        // },

        // async updateTransaction(){
        //     this.isLoading = true;
        //     try{
        //         const response = (await http.put(`wallets/${this.currentWallet.id}`,this.currentWallet));
        //         this.currentWallet = {
        //             id: null,
        //             name: null,
        //             project_api_url: null,
        //             currency_id: null,
        //             firm_id: null,
        //             parent_id: null,
        //             categories: [
        //                 {
        //                     name: null,
        //                     icon: null,
        //                     color: '#000',
        //                     bgcolor: '#fff',
        //                     type: null,
        //                 }
        //             ],
        //             users: []
        //         },
        //         this.isLoading = false
        //     }
        //     catch(error){
        //         this.validationErrors = error.response.data.errors;
        //         this.isLoading = false
        //     }
        // },

        async deleteTransaction(transaction_id){
            this.isLoading = true
            this.validationErrors = null
            try {
                await transactionService.deleteTransaction(transaction_id)
                this.isLoading = false
            } 
            catch (error) {
                this.isLoading = false
                this.validationErrors = error.response.data.errors
            }
        }
    }
})