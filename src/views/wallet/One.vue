<script setup>
    import Paginate from "vuejs-paginate-next";
    import router from '@/router'
    import moment from 'moment'
    import { useRoute } from 'vue-router'
    import { useWalletStore } from "@/stores/wallet"
    import { useItemsNumber } from "@/composables/ItemsNumber"
    import { useTransactionStore } from "@/stores/transaction"
    import { useAuthStore } from '@/stores/auth'
    import { useCategoryStore } from '@/stores/category'
    import { usePaymentMethodStore } from '@/stores/paymentMethod'
    import { ref, onMounted  } from 'vue'
    import * as XLSX from 'xlsx/xlsx.mjs';
    import { i18n } from '@/utils/i18n'

    const storeAuth = useAuthStore()
    const { correct_pages } = useItemsNumber()
    const route = useRoute()
    const walletStore = useWalletStore();
    const transactionStore = useTransactionStore();
    const categoryStore = useCategoryStore();
    const paymentMethodStore = usePaymentMethodStore();
    categoryStore.getCategories({
      wallet_id: route.params.wallet_id
    })
    paymentMethodStore.getPaymentMethods()
    walletStore.getWallet(route.params.wallet_id)
    const filter_category = ref(null)
    const filter_payment_method = ref(null)
    const filter_date = ref(null)
    async function getTransactions(page = 1){
        await transactionStore.getTransactions({
            page,
            date: (filter_date.value) ? moment(filter_date.value).format("YYYY-MM-DD") : null,
            wallet_id: route.params.wallet_id,
            category_id: filter_category.value,
            payment_method_id: filter_payment_method.value,
            order: 'desc'
        })
    }
    async function deleteTransaction(transaction_id){
        if(confirm(i18n.t('areYouSure'))){
            await transactionStore.deleteTransaction(transaction_id)
            await walletStore.getWallet(route.params.wallet_id)
            await getTransactions(1)
        }
    }
    async function getChildWallets(page = 1){
        await walletStore.getWallets({
            page,
            parent_id: route.params.wallet_id,
            order: 'desc'
        })
    }
    getChildWallets(1)
    getTransactions(1)
    const exportable_table = ref(null)
    function exportToExcel(type,fn,dl){
        let elt = exportable_table.value
        let wb = XLSX.utils.table_to_book(elt,{sheet:"Trsansactions"})
        return dl ? 
            XLSX.write(wb,{bookType:type,bookSST:true,type:'base64'}) :
            XLSX.writeFile(wb,fn||(walletStore.currentWallet.name+'.'+(type||'xlsx')))
    }
</script>
 
 <template>
    <div v-if="walletStore.currentWallet" class="row">
        <div class="col-md-12">
            <a
                href="#" 
                @click.prevent="router.go(-1)"
                class="btn btn-secondary btn-sm"
                style="float:right"
            >{{ $t('back') }}</a>
            
            <h3 class="text-center">{{ walletStore.currentWallet.name }}</h3>
            <div class="text-center" v-if="!walletStore.currentWallet.children.length">
                {{ $t('Balance') }}: <span>{{ walletStore.currentWallet.balance }} {{ walletStore.currentWallet.currency.ccy }}</span> &nbsp;&nbsp;&nbsp;
                {{ $t('Monthly Cash Flow') }}: <span>{{ walletStore.currentWallet.monthly_cash_flow }} {{ walletStore.currentWallet.currency.ccy }}</span>
            </div>

            <center>
                <router-link 
                    v-if="walletStore.currentWallet.children.length"
                    :to="`/wallets/${route.params.wallet_id}/transactions/add`"
                    class="btn btn-success btn-sm"            
                > + {{ $t('Add transaction') }}</router-link>  
            </center>

            <div v-if="!walletStore.currentWallet.children.length" class="pt-5">
                <h4 class="text-center">
                    {{ $t('transactions') }} 
                    <router-link 
                        :to="`/wallets/${route.params.wallet_id}/transactions/add`"
                        class="btn btn-success btn-sm"            
                    >+</router-link>  
                </h4>
                <!-- {{ transactionStore.transactions }} -->
                <button @click="exportToExcel('xlsx')" class="btn btn-warning btn-sm mb-2">{{ $t('Export to MS Excel') }}</button>
                <table class="table table-bordered table-condensed table-hover" ref="exportable_table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{{ $t('Sum') }}</th>
                            <th>{{ $t('Date') }}</th>
                            <!-- <th>Image</th> -->
                            <th>{{ $t('Category') }}</th>
                            <th>{{ $t('Payment Method') }}</th>
                            <th>{{ $t('Note') }}</th>
                            <th>{{ $t('actions') }}</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>
                                <Datepicker v-model="filter_date" @update:modelValue="getTransactions(1)" />
                            </th>
                            <th>
                                <select v-model="filter_category" @change.prevent="getTransactions(1)">
                                    <option></option>
                                    <option 
                                        v-for="category,index in categoryStore.categories" 
                                        :key="'category'+index" 
                                        :value="category.id"
                                    >
                                        {{ category.name }}
                                    </option>
                                </select>
                            </th>
                            <th>
                                <select v-model="filter_payment_method" @change.prevent="getTransactions(1)">
                                    <option></option>
                                    <option 
                                        v-for="paymentMethod,index in paymentMethodStore.paymentMethods" 
                                        :key="'paymentMethod'+index" 
                                        :value="paymentMethod.id"
                                    >
                                        {{ paymentMethod.name }}
                                    </option>
                                </select>
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="transaction,index in transactionStore.transactions" :key="'transaction'+index">
                            <td>
                                {{ 
                                    correct_pages(
                                        index,
                                        transactionStore.pagination.current_page,
                                        transactionStore.pagination.per_page,
                                        transactionStore.pagination.total
                                    ) 
                                }}
                            </td>
                            <td>
                                <span 
                                    v-if="transaction.debit"
                                    class="green-text"
                                >
                                    +{{ transaction.debit }} 
                                    <!-- {{ walletStore.currentWallet.currency.ccy }} -->
                                </span>
                                <span 
                                    v-else
                                    class="red-text"
                                >
                                    -{{ transaction.credit }} 
                                    <!-- {{ walletStore.currentWallet.currency.ccy }} -->
                                </span>
                            </td>
                            <td>
                                {{ moment(transaction.date).format("DD.MM.YYYY") }}
                            </td>
                            <td>
                                <span v-if="transaction.category">
                                    {{ transaction.category.name }}
                                </span>
                            </td>
                            <td>
                                {{ transaction.payment_method.name }}
                            </td>
                            <td>{{ transaction.note }}</td>
                            <td>
                                <!-- <router-link :to="'/wallets/' + wallet.id + '/edit'" class="btn btn-primary btn-sm mr-2">Edit</router-link> &nbsp; -->
                                <a 
                                    v-if="storeAuth.can('Delete transaction')"
                                    href="#" 
                                    @click.prevent="deleteTransaction(transaction.id)" 
                                    class="btn btn-danger btn-sm ml-2"
                                >{{ $t('delete') }}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <paginate
                    v-if="transactionStore.pagination && transactionStore.pagination.last_page>1"
                    :page-count="transactionStore.pagination.total"
                    :click-handler="getTransactions"
                    :prev-text="'<<'"
                    :next-text="'>>'"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                    >
                </paginate>
            </div>

            <div v-if="!walletStore.currentWallet.parent" class="pt-5">
                <h4 class="text-center">
                    {{ $t('Child wallets') }} 
                    <router-link 
                        :to="`/wallets/${route.params.wallet_id}/add`"
                        class="btn btn-success btn-sm"
                        
                    >+</router-link>  
                </h4>
                <template v-if="walletStore.wallets">
                    <table class="table table-bordered table-condensed">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{{ $t('name') }}</th>
                                <th>{{ $t('Project Api URL') }}</th>
                                <th>{{ $t('Currency') }}</th>
                                <th>{{ $t('Firm') }}</th>
                                <th>{{ $t('users') }}</th>
                                <th>{{ $t('actions') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="wallet,index in walletStore.wallets" :key="'wallet'+index">
                                <td>
                                    {{ 
                                        correct_pages(
                                            index,
                                            walletStore.pagination.current_page,
                                            walletStore.pagination.per_page,
                                            walletStore.pagination.total
                                        ) 
                                    }}
                                </td>
                                <td>
                                    <router-link :to="'/wallets/' + wallet.id + '/'">
                                        {{ wallet.name }}
                                    </router-link>
                                </td>    
                                <td>{{ wallet.project_api_url }}</td>
                                <td>{{ wallet.currency.ccynm_en }}</td>
                                <td>
                                    <span v-if="wallet.firm">{{ wallet.firm.name }}</span>
                                </td>
                                <td>{{ wallet.users.length }}</td>
                                <td>
                                    <router-link :to="'/wallets/' + wallet.id + '/edit'" class="btn btn-primary btn-sm mr-2">Edit</router-link> &nbsp;
                                    <a href="#" @click.prevent="deleteWallet(wallet.id)" class="btn btn-danger btn-sm ml-2">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <paginate
                        v-if="walletStore.pagination && walletStore.pagination.last_page>1"
                        :page-count="walletStore.pagination.total"
                        :click-handler="getWallets"
                        :prev-text="'<<'"
                        :next-text="'>>'"
                        :container-class="'pagination'"
                        :page-class="'page-item'"
                        >
                    </paginate>
                </template>
            </div>
        </div>
    </div>

 </template>

 <style lang="scss" scoped>
    .green-text{
        color: green
    }
    .red-text{
        color: red
    }
 </style>