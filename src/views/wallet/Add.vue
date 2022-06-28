<script setup>
    import Form from '@/components/WalletForm.vue'
    import { useWalletStore } from "@/stores/wallet"
    import router from '@/router'
    const walletStore = useWalletStore();
    walletStore.currentWallet = {
        id: null,
        name: null,
        project_api_url: null,
        currency_id: null,
        firm_id: null,
        parent_id: null,
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
    };
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
    >{{ $t('back') }}</router-link>
    
    <h2 class="text-center">{{ $t('Add new wallet') }}</h2>

    <form @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">{{ $t('Submit') }}</button>
    </form>    
</template>