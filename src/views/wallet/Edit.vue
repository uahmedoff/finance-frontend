<script setup>
    import Form from '@/components/WalletForm.vue'
    import { useWalletStore } from "@/stores/wallet"
    import { useRoute } from 'vue-router'
    import router from '@/router'

    const walletStore = useWalletStore();
    const route = useRoute()
    async function getWallet(){
        await walletStore.getWallet(route.params.wallet_id)
        for(let i=0;i<walletStore.currentWallet.users.length;i++){
             await (walletStore.currentWallet.users[i] = walletStore.currentWallet.users[i].id);
        }
    }
    getWallet();
    async function submitForm(){
        await walletStore.updateWallet()
        if(!walletStore.validationErrors){
            router.push('/wallets')
            await walletStore.getWallets({
                order: 'desc'
            })
        }
    }
</script>

<template>
    <router-link 
        to="/wallets" 
        class="btn btn-secondary btn-sm"
        style="float:right"
    >{{ $t('back') }}</router-link>
    
    
    <h2 class="text-center">{{ $t('Edit wallet') }}</h2>
    <form v-if="walletStore.currentWallet" @submit.prevent="submitForm" class="pb-3">
        <Form />
        <button type="submit" class="btn btn-primary">{{ $t('Submit') }}</button>
    </form>    
</template>