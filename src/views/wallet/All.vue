<script setup>
    import Paginate from "vuejs-paginate-next";
    import { useItemsNumber } from "@/composables/ItemsNumber"
    import { useWalletStore } from "@/stores/wallet"
    const walletStore = useWalletStore();
    walletStore.getWallets({
       order: "DESC" 
    });
    async function deleteWallet(wallet_id){
        if(confirm("Are sure to delete?")){
            await walletStore.deleteWallet(wallet_id);
            await walletStore.getWallets({
                order: "DESC" 
            });
        }
    }
</script>

<template>
    <h2 class="text-center">
        {{ $t('wallets') }} 
        <router-link 
            to="/wallets/add"
            class="btn btn-success btn-sm"
            
        >+</router-link>  
    </h2>
        <template v-if="walletStore.wallets">
            <table class="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Project api url</th>
                        <th>Currency</th>
                        <th>Firm</th>
                        <th>Users</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="wallet,index in walletStore.wallets" :key="'wallet'+index">
                        <td>{{ ++index }}</td>
                        <td>
                            <router-link :to="'/wallets/' + wallet.id">
                                {{ wallet.name }}
                            </router-link>
                        </td>    
                        <td>{{ wallet.project_api_url }}</td>
                        <td>{{ wallet.currency.ccynm_en }}</td>
                        <td>{{ wallet.firm.name }}</td>
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

</template>