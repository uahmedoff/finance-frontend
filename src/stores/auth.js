import { defineStore } from 'pinia'
import {setItem,getItem,removeItem} from '@/helpers/localStorage'
import router from '@/router'
import authService from '@/services/auth'
import { i18n } from '@/utils/i18n';

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
        isAnonymous: (state) => state.isLoggedIn === false,
        isCEO: (state) => {
            if(state.currentUser)
                return state.currentUser.role == "CEO";
            if(getItem('user'))
                return getItem('user').role == "CEO";   
            return null;
        }
    },
    actions: {
        async login(credentials){
            this.isSubmitting = true;
            this.validationErrors = null;
            try {
                const response = (await authService.login(credentials)).data;
                setItem('user',response.data);
                setItem('accessToken',response.meta.token);
                i18n.locale = response.data.lang
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
                i18n.locale = response.data.lang
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
        can(permission){
            return this.currentUser.permissions.indexOf(permission) !== -1;
        },
        logout(){
            setItem('accessToken','');
            this.currentUser = null
            this.isLoggedIn = false
            removeItem('user');
            removeItem('accessToken');
            router.push('/auth/login');
        },
    }
})
