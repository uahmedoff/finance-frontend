<script setup>
    import {onMounted, onUnmounted} from "vue"
    let loginCss = "";
    onMounted(() => {
        loginCss = document.createElement('link')
        loginCss.setAttribute('href', 'https://getbootstrap.com/docs/5.1/examples/sign-in/signin.css')
        loginCss.setAttribute('rel','stylesheet')
        document.head.appendChild(loginCss);
        document.body.classList.add('text-center')
    })
    onUnmounted(() => {
        document.head.removeChild(loginCss);
        document.body.classList.remove('text-center')
    })
</script>

<template>
    <router-view></router-view>
</template>