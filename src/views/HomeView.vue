<script setup>
import { useCounterStore } from '@/stores/counter'
import TheWelcome from '@/components/TheWelcome.vue'

const storeCounter = useCounterStore()
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->

    <button @click="$i18n.locale = 'uz'">Uz</button>
    <button @click="$i18n.locale = 'ru'">Ru</button>
    <button @click="$i18n.locale = 'en'">En</button>

    <h3>{{$t('hello')}}</h3>

    <h1> AAA: {{ storeCounter.doubleCount }} </h1>

    <button @click.prevent="storeCounter.increment">Increment</button>
  </main>
</template>
