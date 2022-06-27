<script setup>
    import { useCategoryStore } from'@/stores/category'
    const categoryStore = useCategoryStore()
</script>

<template>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="categoryStore.currentCategory.name">
        <span 
            v-if="
            categoryStore.validationErrors && 
            categoryStore.validationErrors.name && 
            categoryStore.validationErrors.name.length
            "
            class="text-red"
        >
            {{ categoryStore.validationErrors.name[0] }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .text-red{
        color:red;
    }
</style>