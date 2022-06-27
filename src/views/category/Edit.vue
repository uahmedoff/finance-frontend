<script setup>
    import Form from '@/components/CategoryForm.vue'
    import router from '@/router'
    import { useCategoryStore } from'@/stores/category'
    import { useRoute } from 'vue-router'
    import { onUnmounted } from 'vue'

    const categoryStore = useCategoryStore()
    const route = useRoute()
    categoryStore.getCategory(route.params.category_id)
    async function submitForm(){
        await categoryStore.updateCategory()
        if(!categoryStore.validationErrors){
            await categoryStore.getCategories({
                order: "DESC"
            })
            router.push('/categories')
        }
    }
    onUnmounted(() => {
        categoryStore.currentCategory = {
            id: null,
            wallet: null,
            name: null,
            icon: null,
            color: null,
            bgcolor: null,
            type: null,
            parent_id: null,
        }
    })
</script>

<template>
    <router-link 
        to="/categories" 
        class="btn btn-secondary btn-sm"
        style="float:right"
    >back</router-link>
    <form @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>    
</template>