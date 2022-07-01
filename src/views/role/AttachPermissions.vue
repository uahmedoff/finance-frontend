<script setup>
    import { useRoleStore } from '@/stores/role'
    import MultiColumnSkeleton from '@/components/MultiColumnSkeleton.vue'
    import { useRoute } from 'vue-router'
    import { onMounted } from 'vue'
    const roleStore = useRoleStore()
    const route = useRoute()
    
    roleStore.getRole(route.params.role_id)
    roleStore.getPermissions()
    
    // methods
    async function savePermissions(){
        await roleStore.putPermissionsToRole(route.params.role_id,roleStore.role.permissions.join(","))
        alert("Permissions are attached!")
    }

    // mounted
    onMounted(() => {
        window.Echo.channel('channel-permission')
            .listen('PermissionEvent',(e) => {
                if(e.changed){
                    roleStore.getRole(route.params.role_id)
                }
            })
    })
</script>
<template>
    <div 
        v-if="roleStore.isLoading"
        id="permissions"
    >
        <MultiColumnSkeleton />
    </div>
    <div v-else-if="roleStore.role && roleStore.permissions">
        <router-link to="/roles" class="btn btn-secondary btn-sm float-end">{{ $t('back') }}</router-link>
        <h3 class="text-center">{{ $t(roleStore.role.role) }}</h3>
        <div id="permissions">
            
            <!-- <template v-else> -->
                <div v-for="permission,index in roleStore.permissions.data" :key="'permission' + index">
                    <label>
                        <input type="checkbox" v-model="roleStore.role.permissions" :value="permission"> 
                        {{ $t(permission) }}
                    </label> 
                </div>
            <!-- </template> -->
        </div>
        <br>
        <button 
            v-if="roleStore.permissions.data.length" 
            class="btn btn-primary btn-sm" 
            @click.prevent="savePermissions"  
        >{{$t('save')}}</button>
    </div>
</template>

<style lang="scss" scoped>
    @media screen and (min-width:768px){
        #permissions{
            -webkit-column-gap: 40px; /* Chrome, Safari, Opera */
            -moz-column-gap: 40px; /* Firefox */
            column-gap: 40px;

            -webkit-column-count: 5; /* Chrome, Safari, Opera */
            -moz-column-count: 5; /* Firefox */
            column-count: 5;

            -webkit-column-rule: 4px double #000; /* Chrome, Safari, Opera */
            -moz-column-rule: 4px double #000; /* Firefox */
            column-rule: 4px double #000;
        }
    }
</style>