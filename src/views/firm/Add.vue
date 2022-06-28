<script setup>
    import Form from '@/components/FirmForm.vue'
    import router from '@/router'
    import { useFirmStore } from'@/stores/firm'
    const firmStore = useFirmStore()
    async function submitForm(){
        await firmStore.addFirm()
        if(!firmStore.validationErrors){
            await firmStore.getFirms({
                order: 'desc'
            })
            router.push('/firms')
        }
    }
</script>

<template>
    <router-link 
        to="/firms" 
        class="btn btn-danger btn-sm"
        style="float:right"
    >x</router-link>
    <form @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">{{ $t('Submit') }}</button>
    </form>    
</template>