<script setup>
    import { ref } from "vue" 
    import { useUserStore } from "@/stores/user"
    import Paginate from "vuejs-paginate-next";
    import Form from '@/components/UserForm.vue'
    import { useItemsNumber } from "@/composables/ItemsNumber"
    import { i18n } from '@/utils/i18n';

    const { correct_pages } = useItemsNumber()
    const filter_name = ref(null);
    const filter_phone = ref(null);
    const filter_lang = ref(null);
    const userStore = useUserStore()
    async function getUsers(page = 1){
        await userStore.getUsers({
            page,
            name: filter_name.value,
            phone: filter_phone.value,
            lang: filter_lang.value,
            order: 'desc'
        })
    }
    async function deleteUser(user_id){
        if(confirm(i18n.t('areYouSure'))){
            await userStore.deleteUser(user_id)
            await userStore.getUsers(1)
        }
    }
    getUsers()
</script>

<template>

    <h2 class="text-center">{{ $t('users') }} <router-link to="/users/add" class="btn btn-success">+</router-link> </h2>
    <router-view></router-view>
    <div class="row">
        <div class="col-md-12">
            <b-skeleton-table
                v-if="userStore.isLoading"
                :rows="6"
                :columns="4"
                :table-props="{ bordered: true, striped: true }"
            ></b-skeleton-table>

            <table 
                v-else
                class="table table-bordered table-condensed table-hover"
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{{ $t('username') }}</th>
                        <th>{{ $t('phone') }}</th>
                        <th>{{ $t('lang') }}</th>
                        <th>{{ $t('role') }}</th>
                        <th>{{ $t('actions') }}</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><input type="text" v-model="filter_name" @change.prevent="getUsers(1)"></th>
                        <th><input type="text" v-model="filter_phone" @change.prevent="getUsers(1)"></th>
                        <th><input type="text" v-model="filter_lang" @change.prevent="getUsers(1)"></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user,index in userStore.users" :key="'user' + index">
                        <td>
                            {{ 
                                correct_pages(
                                    index,
                                    userStore.pagination.current_page,
                                    userStore.pagination.per_page,
                                    userStore.pagination.total
                                ) 
                            }}
                        </td>
                        <td>{{user.name}}</td>
                        <td>{{user.phone}}</td>
                        <td>{{user.lang}}</td>
                        <td>{{$t(user.role)}}</td>
                        <td>
                            <router-link :to="'/users/'+user.id+'/edit'" class="btn btn-primary btn-sm">{{ $t('edit') }}</router-link> &nbsp;
                            <a href="#" @click.prevent="deleteUser(user.id)" class="btn btn-danger btn-sm">{{ $t('delete') }}</a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <paginate
                v-if="userStore.pagination && userStore.pagination.last_page>1"
                :page-count="userStore.pagination.total"
                :click-handler="getUsers"
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