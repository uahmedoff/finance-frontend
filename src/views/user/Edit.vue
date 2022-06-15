<script setup>
    import Form from '@/components/UserForm.vue'
    import router from '@/router'
    import { useUserStore } from'@/stores/user'
    import { useRoute } from 'vue-router'
    import { onUnmounted } from 'vue'

    const userStore = useUserStore()
    const route = useRoute()
    userStore.getUser(route.params.user_id)
    async function submitForm(){
        await userStore.updateUser()
        if(!userStore.validationErrors){
            await userStore.getUsers()
            router.push('/users')
        }
    }
    onUnmounted(() => {
        userStore.currentUser = {
            id: null,
            name: null,
            phone: null,
            password: null,
            lang: null,
            role: null
        }
    })
</script>

<template>
    <router-link 
        to="/users" 
        class="btn btn-danger btn-sm"
        style="float:right"
    >x</router-link>
    <form @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>    
</template>