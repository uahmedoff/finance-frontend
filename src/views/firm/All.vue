<script setup>
    import { ref, onMounted } from "vue" 
    import { useFirmStore } from "@/stores/firm"
    import Paginate from "vuejs-paginate-next";
    import { useItemsNumber } from "@/composables/ItemsNumber"
    import Form from '@/components/FirmForm.vue'
    import {i18n} from '@/utils/i18n'

    const { correct_pages } = useItemsNumber()
    const search = ref(null);
    const firmStore = useFirmStore()
    
    // methods
    async function getFirms(page = 1){
        await firmStore.getFirms({
            page,
            search: search.value,
            order: 'desc'
        })
    }
    async function deleteFirm(firm_id){
        if(confirm(i18n.t("areYouSure"))){
            await firmStore.deleteFirm(firm_id)
            await getFirms({
                order: 'desc'
            })
        }
    }
    
    // mounted
    onMounted(() => {
        window.Echo.channel('channel-firm')
            .listen('FirmEvent',(e) => {
                if(e.changed){
                    getFirms(1)
                }
            })
    })
    getFirms()
</script>

<template>

    <h2 class="text-center">{{ $t('firms') }} <router-link to="/firms/add" class="btn btn-success">+</router-link> </h2>
    <router-view></router-view>
    <div class="row">
        <div class="col-md-12">
            <b-skeleton-table
                v-if="firmStore.isLoading"
                :rows="5"
                :columns="3"
                :table-props="{ bordered: true, striped: true }"
            ></b-skeleton-table>
            <table 
                v-else    
                class="table table-bordered table-condensed table-hover"
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{{ $t('name') }}</th>
                        <th>{{ $t('actions') }}</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><input type="text" v-model="search" @change.prevent="getFirms(1)"></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="firm,index in firmStore.firms" :key="'firm' + index">
                        <td>
                            {{ 
                                correct_pages(
                                    index,
                                    firmStore.pagination.current_page,
                                    firmStore.pagination.per_page,
                                    firmStore.pagination.total
                                ) 
                            }}
                        </td>
                        <td>{{firm.name}}</td>
                        <td>
                            <router-link :to="'/firms/'+firm.id+'/transactions/add'" class="btn btn-warning btn-sm">{{ $t('Make expense') }}</router-link> &nbsp;
                            <router-link :to="'/firms/'+firm.id+'/edit'" class="btn btn-primary btn-sm">{{ $t('edit') }}</router-link> &nbsp;
                            <a href="#" @click.prevent="deleteFirm(firm.id)" class="btn btn-danger btn-sm">{{ $t('delete') }}</a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <paginate
                v-if="firmStore.pagination && firmStore.pagination.last_page>1"
                :page-count="firmStore.pagination.total"
                :click-handler="getFirms"
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