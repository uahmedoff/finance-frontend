import { defineStore } from 'pinia'
// import http from '@/utils/HTTP'
import categoryService from '@/services/category'

export const useCategoryStore = defineStore({
    id: 'category',
    state: () => ({
        isSubmitting: false,
        isLoading: false,
        categories: null,
        pagination: null,
        currentCategory: {
            id: null,
            wallet: null,
            name: null,
            icon: null,
            color: null,
            bgcolor: null,
            type: null,
            parent_id: null,
        },
        validationErrors: null,
    }),
    getters: {
        
    },
    actions: {

        async getCategories(params){
            this.isLoading = true;
            try{
                const response = (await categoryService.getCategories(params)).data;
                this.categories = response.data;
                this.pagination = response.meta;
                this.isLoading =false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading =false
            }
        },

        async getCategory(category_id){
            this.isLoading = true;
            try{
                const response = (await categoryService.getCategory(category_id)).data;
                this.currentCategory = response.data;
                this.isLoading =false
            }
            catch(error){
                this.validationErrors = error.response.data.errors;
                this.isLoading =false
            }
        },

        async updateCategory(){
            this.isSubmitting = true;
            this.validationErrors = null;
            try {
                await categoryService.updateCategory(this.currentCategory);
                this.isSubmitting = false;
                this.currentCategory = {
                    id: null,
                    wallet: null,
                    name: null,
                    icon: null,
                    color: null,
                    bgcolor: null,
                    type: null,
                    parent_id: null,
                }
            } 
            catch (error) {
                this.isSubmitting = false;
                this.validationErrors = error.response.data.errors;
            }
        },
        
        async deleteCategory(category_id){
            this.isLoading = true;
            this.validationErrors = null;
            try {
                await categoryService.deleteCategory(category_id);
                this.isLoading = false;
            } 
            catch (error) {
                this.isLoading = false;
                this.validationErrors = error.response.data.errors;
            }
        }

    }
})