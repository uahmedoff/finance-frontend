<script setup>
    import moment from 'moment'
    import { useHistoryStore } from '@/stores/history'
    import { historyStatuses } from '@/constants/history'
    const historyStore = useHistoryStore()
    historyStore.getAll({
        order: 'desc'
    });  
</script> 

<template>
    <div>
        <h3 class="text-center">Activity feed</h3>
        <div 
            v-for="h,index in historyStore.history" :key="'history'+index"
            class="card mt-3"
        >
            <div class="card-body">
                <div v-if="h.status == historyStatuses.modelCreated">
                    {{ h.type }} {{ h[h.type.toLowerCase()] }} was added 
                    <span v-if="h.details.created_by">by {{ h.details.created_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.modelUpdated">
                    {{ h.type }} {{ h[h.type.toLowerCase()] }} was edited 
                    <span v-if="h.details.updated_by">by {{ h.details.updated_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.modelDeleted">
                    {{ h.type }} {{ h[h.type.toLowerCase()] }} was deleted 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.roleAttached">
                    Role was attached to {{ h.historiable.name }} 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.roleDetached">
                    Role was detached from {{ h.historiable.name }} 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.permissionAttached">
                    Permission was attached to {{ h.historiable.name }} 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.permissionDetached">
                    Permission was detached to {{ h.historiable.name }} 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.permissionSynced">
                    Permission was synced to {{ h.historiable.name }} 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.userAttachedToWallet">
                    User was attached to {{ h.historiable.name }} 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.userDetachedFromWallet">
                    User was detached from {{ h.historiable.name }} 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.walletAttachedToUser">
                    Wallet was attached to {{ h.historiable.name }} 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>

                <div v-if="h.status == historyStatuses.walletDetachedFomUser">
                    Wallet was detached from {{ h.historiable.name }} 
                    <span v-if="h.details.deleted_by">by {{ h.details.deleted_by.name }}</span>
                    on {{ moment(h.created_at).format("DD.MM.YYYY HH:mm") }}
                </div>
                
            </div>
        </div>
    </div>
</template>