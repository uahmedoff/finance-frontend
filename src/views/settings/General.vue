<script setup>
    import Form from '@/components/CurrentUserForm.vue'
    import router from '@/router'
    import { useAuthStore } from'@/stores/auth'
    import { useRoute } from 'vue-router'

    const authStore = useAuthStore()
    const route = useRoute()
    // authStore.getCurrentUser()
    async function submitForm(){
        await authStore.updateCurrentUser()
        if(!authStore.validationErrors){
            alert("Settings were saved!")
            // router.push('/users')
        }
    }
    
</script>

<template>
    <router-link 
        to="/" 
        class="btn btn-secondary btn-sm"
        style="float:right"
    >{{ $t('back') }}</router-link>
    <h3 class="text-center">{{ $t('settings') }}</h3>
    <form @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">{{ $t('Submit') }}</button>
    </form>    
</template>