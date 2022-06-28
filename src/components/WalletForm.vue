<script setup>
    import { ref } from 'vue'
    import { useWalletStore } from'@/stores/wallet'
    import { useCurrencyStore } from '@/stores/currency'
    import { useFirmStore } from '@/stores/firm'
    import { useUserStore } from '@/stores/user'
    import { useRoute } from 'vue-router'
    const route = useRoute()
    const walletStore = useWalletStore()
    const currencyStore = useCurrencyStore()
    const firmStore = useFirmStore()
    const userStore = useUserStore()
    currencyStore.getCurrencies()
    firmStore.getFirms()
    userStore.getUsers({
        without_me: true
    })
    function addCategory(){
        walletStore.currentWallet.categories.push({
            name: null,
            icon: null,
            color: '#000',
            bgcolor: '#fff',
            type: null,
        })
    }
    function remove(index){
        walletStore.currentWallet.categories.splice(index,1)
    }
</script>

<template>
    <div class="mb-3">
        <label for="name" class="form-label">{{ $t('name') }}</label>
        <input type="text" class="form-control" id="name" v-model="walletStore.currentWallet.name">
        <span 
            v-if="
            walletStore.validationErrors && 
            walletStore.validationErrors.name && 
            walletStore.validationErrors.name.length
            "
            class="text-red"
        >
            {{ walletStore.validationErrors.name[0] }}
        </span>
    </div>
    <div class="mb-3">
        <label for="phone" class="form-label">{{ $t('Project Api URL') }}</label>
        <input type="text" class="form-control" id="phone" v-model="walletStore.currentWallet.project_api_url">
        <span 
            v-if="
            walletStore.validationErrors && 
            walletStore.validationErrors.project_api_url && 
            walletStore.validationErrors.project_api_url.length
            "
            class="text-red"
        >
            {{ userStore.validationErrors.project_api_url[0] }}
        </span>
    </div>
    <div class="mb-3">
        <label for="currency" class="form-label">{{ $t('Currency') }}</label>
        <select id="currency" v-model="walletStore.currentWallet.currency_id" class="form-control">
            <option 
                v-for="cur,index in currencyStore.currencies" 
                :value="cur.id" 
                :key="'cur'+index"
            >{{ cur.ccynm_en }}</option>
        </select>
        <span 
            v-if="
            walletStore.validationErrors && 
            walletStore.validationErrors.currency_id && 
            walletStore.validationErrors.currency_id.length
            "
            class="text-red"
        >
            {{ walletStore.validationErrors.currency_id[0] }}
        </span>
    </div>
    
    <div class="mb-3">
        <label for="firm" class="form-label">{{ $t('Firm') }}</label>
        <select id="firm" v-model="walletStore.currentWallet.firm_id" class="form-control">
            <option></option>
            <option v-for="firm,index in firmStore.firms" :value="firm.id" :key="'firm'+index">{{ firm.name }}</option>
        </select>
        <span 
            v-if="
            walletStore.validationErrors && 
            walletStore.validationErrors.firm_id && 
            walletStore.validationErrors.firm_id.length
            "
            class="text-red"
        >
            {{ walletStore.validationErrors.firm_id[0] }}
        </span>
    </div>

    <div class="mb-3">
        <label for="firm" class="form-label">{{ $t('Attach categories') }}</label><br>
        <button type="button" @click.prevent="addCategory" class="btn btn-success btn-sm">+</button>
        <div v-for="category,index in walletStore.currentWallet.categories" :key="'category'+index">
            <a 
                v-if="!route.params.wallet_id"
                href="#" 
                class="btn btn-danger btn-sm float-end" 
                @click.prevent="remove(index)"
            >
                x
            </a>
            {{ $t('name') }}: <input type="text" v-model="category.name"> 
            <span 
                v-if="
                walletStore.validationErrors && 
                walletStore.validationErrors['categories.0.name']
                "
                class="text-red"
            >
                {{ walletStore.validationErrors["categories.0.name"][0] }}
            </span> <br>
            {{ $t('Type') }}: <select v-model="category.type">
                <option value="1">{{ $t('Income') }}</option>
                <option value="2">{{ $t('Expense') }}</option>
            </select>
            <span 
                v-if="
                walletStore.validationErrors && 
                walletStore.validationErrors['categories.0.type']
                "
                class="text-red"
            >
                {{ walletStore.validationErrors["categories.0.type"][0] }}
            </span>
            <hr>
        </div>
        
    </div>


    <div class="mb-3">
        <label for="firm" class="form-label">{{ $t('Attach users') }}</label><br>
        <label v-for="user,index in userStore.users" :key="'user' + index">
            <input type="checkbox" v-model="walletStore.currentWallet.users" :value="user.id"> 
            {{ user.name }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label> 
    </div>
    
</template>

<style lang="scss" scoped>
    .text-red{
        color:red;
    }
</style>