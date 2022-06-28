<script setup>
    import Paginate from "vuejs-paginate-next";
    import { useWalletStore } from "@/stores/wallet"
    import { useItemsNumber } from "@/composables/ItemsNumber"
    import { i18n } from "@/utils/i18n"
    const { correct_pages } = useItemsNumber()
    const walletStore = useWalletStore();
    async function getWallets(page = 1){
        await walletStore.getWallets({
            page,
            order: 'desc'
        })
    }
    async function deleteWallet(wallet_id){
        if(confirm(i18n.t('areYouSure'))){
            await walletStore.deleteWallet(wallet_id);
            await walletStore.getWallets({
                order: "DESC" 
            });
        }
    }
    getWallets(1)
</script>

<template>
    <h2 class="text-center">
        {{ $t('wallets') }} 
        <router-link 
            to="/wallets/add"
            class="btn btn-success btn-sm"
            
        >+</router-link>  
    </h2>
    <b-skeleton-table
        v-if="walletStore.isLoading"
        :rows="5"
        :columns="7"
        :table-props="{ bordered: true, striped: true }"
    ></b-skeleton-table>
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
                        <router-link :to="'/wallets/' + wallet.id">
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
                        <router-link :to="'/wallets/' + wallet.id + '/edit'" class="btn btn-primary btn-sm mr-2">{{ $t('edit') }}</router-link> &nbsp;
                        <a href="#" @click.prevent="deleteWallet(wallet.id)" class="btn btn-danger btn-sm ml-2">{{ $t('delete') }}</a>
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