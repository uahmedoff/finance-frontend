<script setup>
    import { useUserStore } from'@/stores/user'
    const userStore = useUserStore()
</script>

<template>
    
    <div class="mb-3">
        <label for="name" class="form-label">{{ $t('username') }}</label>
        <input type="text" class="form-control" id="name" v-model="userStore.currentUser.name">
        <span 
            v-if="
            userStore.validationErrors && 
            userStore.validationErrors.name && 
            userStore.validationErrors.name.length
            "
            class="text-red"
        >
            {{ userStore.validationErrors.name[0] }}
        </span>
    </div>
    <div class="mb-3">
        <label for="phone" class="form-label">{{ $t('phone') }}</label>
        <input type="text" class="form-control" id="phone" v-model="userStore.currentUser.phone">
        <span 
            v-if="
            userStore.validationErrors && 
            userStore.validationErrors.phone && 
            userStore.validationErrors.phone.length
            "
            class="text-red"
        >
            {{ userStore.validationErrors.phone[0] }}
        </span>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">{{ $t('password') }}</label>
        <input type="password" class="form-control" id="password" v-model="userStore.currentUser.password">
        <span 
            v-if="
            userStore.validationErrors && 
            userStore.validationErrors.password && 
            userStore.validationErrors.password.length
            "
            class="text-red"
        >
            {{ userStore.validationErrors.password[0] }}
        </span>
    </div>
    <div class="mb-3">
        <label for="lang" class="form-label">{{ $t('lang') }}</label>
        <select id="lang" class="form-control" v-model="userStore.currentUser.lang">
            <option value="uz">O`zbekcha</option>
            <option value="ru">Russian</option>
            <option value="en">English</option>
        </select>
        <span 
            v-if="
            userStore.validationErrors && 
            userStore.validationErrors.lang && 
            userStore.validationErrors.lang.length
            "
            class="text-red"
        >
            {{ userStore.validationErrors.lang[0] }}
        </span>
    </div>
    <div class="mb-3">
        <label for="role" class="form-label">{{ $t('role') }}</label>
        <select id="role" class="form-control" v-model="userStore.currentUser.role">
            <option value="CEO">{{ $t('CEO') }}</option>
            <option value="CFO">{{ $t('CFO') }}</option>
            <option value="Manager">{{ $t('Manager') }}</option>
            <option value="Cashier">{{ $t('Cashier') }}</option>
        </select>
        <span 
            v-if="
            userStore.validationErrors && 
            userStore.validationErrors.role && 
            userStore.validationErrors.role.length
            "
            class="text-red"
        >
            {{ userStore.validationErrors.role[0] }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .text-red{
        color:red;
    }
</style>