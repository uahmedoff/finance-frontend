<script setup>
    import Form from '@/components/WalletForm.vue'
    import { useWalletStore } from "@/stores/wallet"
    import router from '@/router'
    const walletStore = useWalletStore();
    async function submitForm(){
        await walletStore.addWallet()
        if(!walletStore.validationErrors){
            await walletStore.getWallets({
                order: 'desc'
            })
            router.push('/wallets')
        }
    }
</script>

<template>
    <router-link 
        to="/wallets" 
        class="btn btn-secondary btn-sm"
        style="float:right"
    >Back</router-link>
    
    <h2 class="text-center">Add new wallet</h2>

    <form @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>    
</template>