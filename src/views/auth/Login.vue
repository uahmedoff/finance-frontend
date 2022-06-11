<script setup>
    import {onMounted, onUnmounted, ref} from "vue"
    import { useAuthStore } from '@/stores/auth'
    const authStore = useAuthStore()
    let credentials = ref({
        phone: '',
        password: ''
    })
    onMounted(() => {
        document.body.classList.add('text-center')
    })
    onUnmounted(() => {
        document.body.classList.remove('text-center')
    })
</script>

<template>
    <!-- {{ authStore.currentUser }} -->
    <main class="form-signin">
        <form @submit.prevent="authStore.login(credentials)">
            <!-- <img class="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input type="text" class="form-control" id="phoneNo" v-model="credentials.phone">
                <label for="floatingInput">Phone number</label>
            </div>
            <span 
                v-if="authStore.validationErrors && authStore.validationErrors.phone"
                class="color-red"
            >
                {{ authStore.validationErrors.phone[0] }}
            </span>
            <div class="form-floating">
                <input type="password" class="form-control" id="password" v-model="credentials.password">
                <label for="floatingPassword">Password</label>
            </div>
            <span 
                v-if="authStore.validationErrors && authStore.validationErrors.password"
                class="color-red"
            >
                {{ authStore.validationErrors.password[0] }}
            </span>
            <!-- <div class="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
            </div> -->
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
        </form>
    </main>
</template>

<style>
    @import url('https://getbootstrap.com/docs/5.1/examples/sign-in/signin.css');

    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
    }

    .color-red{
        color:red;
    }
</style>