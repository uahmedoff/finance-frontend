<script setup>
import { useRegisterSW } from "virtual:pwa-register/vue";
import { onMounted } from "vue";
import { useAuthStore } from '@/stores/auth'
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
  <router-view />
</template>

<style>
#app{
  width:100%;
}
</style>
