import { defineStore } from 'pinia'
import {setItem,getItem,removeItem} from '@/helpers/localStorage'
import router from '@/router'
import authService from '@/services/auth'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        currentUser: null,
        validationErrors: null,
        isLoggedIn: null,
        returnUrl: null
    }),
    getters: {
        isAnonymous: (state) => state.isLoggedIn === false
    },
    actions: {
        async login(credentials){
            this.isSubmitting = true;
            this.validationErrors = null;
            try {
                const response = (await authService.login(credentials)).data;
                setItem('user',response.data);
                setItem('accessToken',response.meta.token);
                this.isSubmitting = false;
                this.currentUser = response.data;
                this.isLoggedIn = true;
                router.push(this.returnUrl || '/')
            } 
            catch (error) {
                this.isSubmitting = false;
                this.validationErrors = error.response.data.errors;
            }
        },
        async getCurrentUser(){
            this.isLoading = true;
            try {
                const response = (await authService.getCurrentUser()).data;
                this.isLoading = false;
                this.currentUser = response.data;
                this.isLoggedIn = true;
                router.push(this.returnUrl || '/')
            } 
            catch (error) {
                this.isLoading = false;
                this.isLoggedIn = false;
                this.currentUser = null;
                removeItem('user');
                removeItem('accessToken');
            }
        },
    }
})