<script setup>
    import { useFirmStore } from'@/stores/firm'
    const firmStore = useFirmStore()
</script>

<template>

    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="firmStore.currentFirm.name">
        <span 
            v-if="
            firmStore.validationErrors && 
            firmStore.validationErrors.name && 
            firmStore.validationErrors.name.length
            "
            class="text-red"
        >
            {{ firmStore.validationErrors.name[0] }}
        </span>
    </div>
    
</template>

<style lang="scss" scoped>
    .text-red{
        color:red;
    }
</style>