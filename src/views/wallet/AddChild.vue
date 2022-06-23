<script setup>
    import Form from '@/components/WalletForm.vue'
    import { useWalletStore } from "@/stores/wallet"
    import router from '@/router'
    import {useRoute} from 'vue-router'
    const route = useRoute()
    const walletStore = useWalletStore();
    walletStore.currentWallet = {
        id: null,
        name: null,
        project_api_url: null,
        currency_id: null,
        firm_id: null,
        parent_id: route.params.wallet_id,
        balance: null,
        monthly_cash_flow: null,
        categories: [
            {
                name: null,
                icon: null,
                color: '#000',
                bgcolor: '#fff',
                type: null,
            }
        ],
        users: []
    }
    async function submitForm(){
        await walletStore.addWallet()
        if(!walletStore.validationErrors){
            await walletStore.getWallets({
                order: 'desc'
            })
            router.push('/wallets/' + route.params.wallet_id)
        }
    }
</script>

<template>

    <router-link 
        :to="`/wallets/${route.params.wallet_id}`" 
        class="btn btn-secondary btn-sm"
        style="float:right"
    >Back</router-link>
    
    <h2 class="text-center">Add new wallet</h2>

    <form @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>    
</template>