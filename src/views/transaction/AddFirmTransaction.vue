<script setup>
    import moment from 'moment'
    import {useRoute} from 'vue-router'
    import Form from '@/components/TransactionForm.vue'
    import {useTransactionStore} from '@/stores/transaction'
    import router from '@/router'
    const route = useRoute()
    const transactionStore = useTransactionStore()
    async function addTransaction(){
        transactionStore.currentTransaction.date = moment(transactionStore.currentTransaction.date).format("YYYY-MM-DD")
        transactionStore.currentTransaction.type = 2
        transactionStore.currentTransaction.firm_id = route.params.firm_id
        await transactionStore.addTransaction()
        if(!transactionStore.validationErrors){
            await transactionStore.getTransactions({
                page:1,
                wallet_id: route.params.wallet_id,
                // category: filter_category.value,
                // payment_method: filter_payment_method.value,
                order: 'desc'
            })
            router.back()
        }
    }
</script>

<template>
    <div>
        <h3 class="text-center">Add transaction</h3>
        <form @submit.prevent="addTransaction">
            <Form />
        </form>
    </div>
</template>