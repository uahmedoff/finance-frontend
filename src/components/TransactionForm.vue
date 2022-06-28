<script setup>
    import moment from 'moment'
    import { ref } from 'vue'
    import { useCategoryStore } from '@/stores/category'
    import { usePaymentMethodStore } from '@/stores/paymentMethod'
    import { useTransactionStore } from '@/stores/transaction'
    import { useRoute } from 'vue-router'

    import { useFormat } from "@/composables/Format"
    const { formatDate } = useFormat()

    const route = useRoute()
    const categoryStore = useCategoryStore()
    const paymentMethodStore = usePaymentMethodStore()
    const transactionStore = useTransactionStore()
    categoryStore.getCategories({
        wallet_id: route.params.wallet_id
    })
    paymentMethodStore.getPaymentMethods()
    const transaction_type = ref()
    function selectType(){
        categoryStore.getCategories({
            wallet_id: route.params.wallet_id,
            type: transaction_type.value
        })  
    }
    if(route.params.firm_id)
        transaction_type.value = 2;
</script>

<template>
    <div class="mb-3" v-if="!route.params.firm_id">
        <label for="type" class="form-label">{{ $t('Type') }}</label>
        <select id="type" v-model="transaction_type" class="form-control" @change="selectType">
            <option value="1">{{ $t('Income') }}</option>
            <option value="2">{{ $t('Expense') }}</option>
        </select>
        <span 
            v-if="
            transactionStore.validationErrors && 
            transactionStore.validationErrors.category_id && 
            transactionStore.validationErrors.category_id.length
            "
            class="text-red"
        >
            {{ transactionStore.validationErrors.category_id[0] }}
        </span>
    </div>
    
    <template v-if="transaction_type">
        <div class="mb-3">
            <label for="category" class="form-label">{{ $t('Category') }}</label>
            <select id="category" v-model="transactionStore.currentTransaction.category_id" class="form-control">
                <option 
                    v-for="cat,index in categoryStore.categories" 
                    :value="cat.id" 
                    :key="'cat'+index"
                >{{ cat.name }}</option>
            </select>
            <span 
                v-if="
                transactionStore.validationErrors && 
                transactionStore.validationErrors.category_id && 
                transactionStore.validationErrors.category_id.length
                "
                class="text-red"
            >
                {{ transactionStore.validationErrors.category_id[0] }}
            </span>
        </div>
        
        <div class="mb-3">
            <label for="payment_method" class="form-label">{{ $t('Payment method') }}</label>
            <select id="payment_method" v-model="transactionStore.currentTransaction.payment_method_id" class="form-control">
                <option 
                    v-for="payment_method,index in paymentMethodStore.paymentMethods" 
                    :key="'payment_method'+index"
                    :value="payment_method.id" 
                >
                    {{ payment_method.name }}
                </option>
            </select>
            <span 
                v-if="
                paymentMethodStore.validationErrors && 
                paymentMethodStore.validationErrors.payment_method_id && 
                paymentMethodStore.validationErrors.payment_method_id.length
                "
                class="text-red"
            >
                {{ paymentMethodStore.validationErrors.payment_method_id[0] }}
            </span>
        </div>

        <div class="mb-3">
            <label for="date" class="form-label">{{ $t('Date') }}</label>
            <Datepicker v-model="transactionStore.currentTransaction.date" id="date" :format="formatDate"></Datepicker>
            <span 
                v-if="
                paymentMethodStore.validationErrors && 
                paymentMethodStore.validationErrors.date && 
                paymentMethodStore.validationErrors.date.length
                "
                class="text-red"
            >
                {{ paymentMethodStore.validationErrors.date[0] }}
            </span>
        </div>

        <div class="mb-3">
            <label for="date" class="form-label">{{ $t('Sum') }}</label>
            <template v-if="transaction_type == 1">
                <input type="text" v-model="transactionStore.currentTransaction.debit" class="form-control">
                <span 
                    v-if="
                    paymentMethodStore.validationErrors && 
                    paymentMethodStore.validationErrors.debit && 
                    paymentMethodStore.validationErrors.debit.length
                    "
                    class="text-red"
                >
                    {{ paymentMethodStore.validationErrors.debit[0] }}
                </span>
            </template>
            
            <template v-else-if="transaction_type == 2">
                <input type="text" v-model="transactionStore.currentTransaction.credit" class="form-control">
                <span 
                    v-if="
                    paymentMethodStore.validationErrors && 
                    paymentMethodStore.validationErrors.credit && 
                    paymentMethodStore.validationErrors.credit.length
                    "
                    class="text-red"
                >
                    {{ paymentMethodStore.validationErrors.credit[0] }}
                </span>
            </template>
        </div>

        <div class="mb-3">
            <label for="note" class="form-label">{{ $t('Note') }}</label>
            <textarea v-model="transactionStore.currentTransaction.note" id="note" class="form-control"></textarea>
            <span 
                v-if="
                paymentMethodStore.validationErrors && 
                paymentMethodStore.validationErrors.note && 
                paymentMethodStore.validationErrors.note.length
                "
                class="text-red"
            >
                {{ paymentMethodStore.validationErrors.note[0] }}
            </span>
        </div> 
        <input type="submit" :value="$t('Submit')">
    </template>

</template>

<style lang="scss" scoped>
    .text-red{
        color:red;
    }
</style>