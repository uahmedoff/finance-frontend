import { defineStore } from 'pinia'
import roleService from '@/services/role'

export const useRoleStore = defineStore({
    id: 'role',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        roles: null,
        role: null,
        permissions: null,
        role_permissions: null,
        permission: null,
        pagination: null,
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getRoles(params){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                const response = (await roleService.getRoles(params)).data;
                this.isLoading = false;
                this.roles = response.data;
                this.pagination = response.meta;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        },

        async getRole(id){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                const response = (await roleService.getRole(id)).data;
                this.isLoading = false;
                this.role = response.data;
                this.isLoggedIn = true;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        },

        async getRolePermissions(id){
            this.isSubmitting = true;
            this.validationErrors = null;
            this.role_permissions = null
            try {
                this.role_permissions = (await roleService.getRolePermissions(id)).data;
                this.isSubmitting = false;
            } 
            catch (error) {
                this.isSubmitting = false;
                this.validationErrors = error.response.data.errors;
            }
        },
        
        async putPermissionsToRole(role_id,permissions){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                await roleService.putPermissionsToRole(role_id,{permissions});
                this.isLoading = false;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        },

        async getPermissions(){
            this.isLoading = true;
            this.validationErrors = null;
            this.permissions = null
            try {
                this.permissions = (await roleService.getPermissions()).data;
                this.isLoading = false;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        },

        async getPermission(id){
            this.isLoading = true;
            this.validationErrors = null;
            this.permission = null
            try {
                this.permission = (await roleService.getPermission(id)).data;
                this.isLoading = false;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        }
    }
})

