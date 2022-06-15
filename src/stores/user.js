import { defineStore } from 'pinia'
import userService from '@/services/user'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        users: null,
        pagination: null,
        currentUser: {
            id: null,
            name: null,
            phone: null,
            password: null,
            lang: null,
            role: null
        },
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getUsers(params){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                const response = (await userService.getUsers(params)).data;
                this.isLoading = false;
                this.users = response.data;
                this.pagination = response.meta;
                this.isLoggedIn = true;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        },
        
        async addUser(){
            this.isSubmitting = true;
            this.validationErrors = null;
            try {
                await userService.addUser(this.currentUser);
                this.isSubmitting = false;
                this.currentUser = {
                    id: null,
                    name: null,
                    phone: null,
                    password: null,
                    lang: null,
                    role: null
                }
            } 
            catch (error) {
                this.isSubmitting = false;
                this.validationErrors = error.response.data.errors;
                // console.log(this.validationErrors.phone[0])
            }
        },

        async getUser(id){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                const response = (await userService.getUser(id)).data;
                this.isLoading = false;
                this.currentUser = response.data;
                this.isLoggedIn = true;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        },

        async updateUser(){
            this.isSubmitting = true;
            this.validationErrors = null;
            try {
                await userService.updateUser(this.currentUser);
                this.isSubmitting = false;
                this.currentUser = {
                    id: null,
                    name: null,
                    phone: null,
                    password: null,
                    lang: null,
                    role: null
                }
            } 
            catch (error) {
                this.isSubmitting = false;
                this.validationErrors = error.response.data.errors;
            }
        },
        
        async deleteUser(user_id){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                await userService.deleteUser(user_id);
                this.isLoading = false;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        }
    }
})

