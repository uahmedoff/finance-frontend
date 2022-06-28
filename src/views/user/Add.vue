<script setup>
    import Form from '@/components/UserForm.vue'
    import router from '@/router'
    import { useUserStore } from'@/stores/user'
    const userStore = useUserStore()
    async function submitForm(){
        await userStore.addUser()
        if(!userStore.validationErrors){
            await userStore.getUsers({
                order: 'desc'
            })
            router.push('/users')
        }
    }
</script>

<template>
    <router-link 
        to="/users" 
        class="btn btn-danger btn-sm"
        style="float:right"
    >x</router-link>
    <form @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">{{ $t('Submit') }}</button>
    </form>    
</template>