<script setup>
    import { useAuthStore } from'@/stores/auth'
    const authStore = useAuthStore()
</script>

<template>
    
    <div class="mb-3">
        <label for="name" class="form-label">{{ $t('username') }}</label>
        <input type="text" class="form-control" id="name" v-model="authStore.currentUser.name">
        <span 
            v-if="
            authStore.validationErrors && 
            authStore.validationErrors.name && 
            authStore.validationErrors.name.length
            "
            class="text-red"
        >
            {{ authStore.validationErrors.name[0] }}
        </span>
    </div>
    <!-- <div class="mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input type="text" class="form-control" id="phone" v-model="authStore.currentUser.phone">
        <span 
            v-if="
            authStore.validationErrors && 
            authStore.validationErrors.phone && 
            authStore.validationErrors.phone.length
            "
            class="text-red"
        >
            {{ authStore.validationErrors.phone[0] }}
        </span>
    </div> -->
    <div class="mb-3">
        <label for="password" class="form-label">{{ $t('password') }}</label>
        <input type="password" class="form-control" id="password" v-model="authStore.currentUser.password">
        <span 
            v-if="
            authStore.validationErrors && 
            authStore.validationErrors.password && 
            authStore.validationErrors.password.length
            "
            class="text-red"
        >
            {{ authStore.validationErrors.password[0] }}
        </span>
    </div>
    <div class="mb-3">
        <label for="lang" class="form-label">{{ $t('lang') }}</label>
        <select id="lang" class="form-control" v-model="authStore.currentUser.lang">
            <option value="uz">O`zbekcha</option>
            <option value="ru">Russian</option>
            <option value="en">English</option>
        </select>
        <span 
            v-if="
            authStore.validationErrors && 
            authStore.validationErrors.lang && 
            authStore.validationErrors.lang.length
            "
            class="text-red"
        >
            {{ authStore.validationErrors.lang[0] }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .text-red{
        color:red;
    }
</style>