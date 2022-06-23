<script setup>
import { useRegisterSW } from "virtual:pwa-register/vue";
import { onMounted } from "vue";
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
const route = useRoute()

const authStore = useAuthStore();
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};
document.title = "Finance App"
authStore.getCurrentUser()
onMounted(async () => {
  await updateServiceWorker()
})
</script>

<template>
  <router-view :key="route.fullPath" />
</template>

<style>
#app{
  width:100%;
}
</style>
