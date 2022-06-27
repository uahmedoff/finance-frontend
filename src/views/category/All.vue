<script setup>
    import { ref } from "vue" 
    import { useCategoryStore } from "@/stores/category"
    import { useWalletStore } from "@/stores/wallet"
    import Paginate from "vuejs-paginate-next";
    import { useItemsNumber } from "@/composables/ItemsNumber"

    const { correct_pages } = useItemsNumber()
    const filter_wallet_id = ref(null);
    const filter_parent_id = ref(null);
    const filter_name = ref(null);
    const filter_type = ref(null);
    const categoryStore = useCategoryStore()
    const walletStore = useWalletStore()
    walletStore.getWallets({
        all:true
    })
    async function getCategories(page = 1){
        await categoryStore.getCategories({
            page,
            name: filter_name.value,
            wallet_id: filter_wallet_id.value,
            parent_id: filter_parent_id.value,
            type: filter_type.value,
            order: 'desc'
        })
    }
    async function deleteCategory(category_id){
        if(confirm("Are you sure?")){
            await categoryStore.deleteCategory(category_id)
            getCategories(1)
        }
    }
    getCategories(1)
    function getCategoryType(type){
        let t = ''
        switch(type){
            case 1:
                t = "Income";
                break;
            case 2:
                t= "Expense";
                break;    
        }
        return t;
    }
</script>

<template>

    <h2 class="text-center">{{ $t('categories') }} </h2>
    
    <div class="row">
        <div class="col-md-12">
            <table class="table table-bordered table-condensed table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Wallet</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><input type="text" v-model="filter_name" @change.prevent="getCategories(1)"></th>
                        <th>
                            <select type="text" v-model="filter_type" @change.prevent="getCategories(1)">
                                <option></option>
                                <option value="1">Income</option>
                                <option value="2">Expense</option>
                            </select>
                        </th>
                        <th>
                            <!-- <input type="text" v-model="filter_lang" @change.prevent="getUsers(1)"> -->
                            <select v-model="filter_wallet_id" @change.prevent="getCategories(1)">
                                <option></option>
                                <option v-for="wallet,index in walletStore.wallets" :key="'wallet'+index" :value="wallet.id">{{ wallet.name }}</option>
                            </select>
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category,index in categoryStore.categories" :key="'category' + index">
                        <td>
                            {{ 
                                correct_pages(
                                    index,
                                    categoryStore.pagination.current_page,
                                    categoryStore.pagination.per_page,
                                    categoryStore.pagination.total
                                ) 
                            }}
                        </td>
                        <td>{{ category.name }}</td>
                        <td>{{ getCategoryType(category.type) }}</td>
                        <td>
                            <span v-if="category.wallet">{{category.wallet.name}}</span>
                        </td>
                        <td>
                            <router-link :to="'/categories/'+category.id+'/edit'" class="btn btn-primary btn-sm">Edit</router-link> &nbsp;
                            <a href="#" @click.prevent="deleteCategory(category.id)" class="btn btn-danger btn-sm">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <paginate
                v-if="categoryStore.pagination && categoryStore.pagination.last_page>1"
                :page-count="categoryStore.pagination.last_page"
                :click-handler="getCategories"
                :prev-text="'<<'"
                :next-text="'>>'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                >
            </paginate>
        </div>
    </div>

</template>

<style scoped>
    .page-item:hover{
        cursor:pointer!important;
    }
</style>