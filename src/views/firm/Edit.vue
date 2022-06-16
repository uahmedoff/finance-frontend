<script setup>
    import Form from '@/components/FirmForm.vue'
    import router from '@/router'
    import { useFirmStore } from'@/stores/firm'
    import { useRoute } from 'vue-router'
    import { onUnmounted } from 'vue'

    const firmStore = useFirmStore()
    const route = useRoute()
    firmStore.getFirm(route.params.firm_id)
    async function submitForm(){
        await firmStore.updateFirm()
        if(!firmStore.validationErrors){
            await firmStore.getFirms({
                order: 'desc'
            })
            router.push('/firms')
        }
    }
    onUnmounted(() => {
        firmStore.currentFirm = {
            id: null,
            name: null,
        }
    })
</script>

<template>
    <router-link 
        to="/firms" 
        class="btn btn-danger btn-sm"
        style="float:right"
    >x</router-link>
    <form @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>    
</template>