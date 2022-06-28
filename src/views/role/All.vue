<script setup>
    import { ref } from "vue" 
    import { useRoleStore } from "@/stores/role"
    import Paginate from "vuejs-paginate-next"
    import { useItemsNumber } from "@/composables/ItemsNumber"

    const { correct_pages } = useItemsNumber()
    const search = ref(null);
    const roleStore = useRoleStore()
    async function getRoles(page = 1){
        await roleStore.getRoles({
            page,
            search: search.value,
            order: 'desc'
        })
    }
    getRoles()
</script>

<template>

    <h2 class="text-center">
        {{ $t('roles') }} 
        <!-- <router-link to="/users/add" class="btn btn-success">+</router-link>  -->
    </h2>
    <router-view></router-view>
    <div class="row">
        <div class="col-md-12">
            <b-skeleton-table
                v-if="roleStore.isLoading"
                :rows="6"
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
                    <!-- <tr>
                        <th></th>
                        <th><input type="text" v-model="filter_name" @change.prevent="getUsers(1)"></th>
                        <th><input type="text" v-model="filter_phone" @change.prevent="getUsers(1)"></th>
                        <th><input type="text" v-model="filter_lang" @change.prevent="getUsers(1)"></th>
                        <th></th>
                        <th></th>
                    </tr> -->
                </thead>
                <tbody>
                    <tr v-for="role,index in roleStore.roles" :key="'role' + index">
                        <td>
                            <!-- {{++index}} -->
                            {{ 
                                correct_pages(
                                    index,
                                    roleStore.pagination.current_page,
                                    roleStore.pagination.per_page,
                                    roleStore.pagination.total
                                ) 
                            }}
                        </td>
                        <td>{{ $t(role.name) }}</td>
                        <td>
                            <!-- <router-link :to="'/users/'+user.id+'/edit'" class="btn btn-primary btn-sm">Edit</router-link> &nbsp;
                            <a href="#" @click.prevent="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</a> -->
                            <router-link :to="'/roles/' + role.id + '/permissions'" class="btn btn-primary btn-sm">{{ $t('permissions') }}</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <paginate
                v-if="roleStore.pagination && roleStore.pagination.last_page>1"
                :page-count="roleStore.pagination.total"
                :click-handler="getRoles"
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