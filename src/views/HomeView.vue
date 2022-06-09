<script setup>
import { useCounterStore } from '@/stores/counter'
import TheWelcome from '@/components/TheWelcome.vue'

const storeCounter = useCounterStore()

async function myFunc(num){
  // await alert(num);
  setTimeout(() => {
    alert(num)
  },2000)
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->

    <button @click="$i18n.locale = 'uz'">Uz</button>
    <button @click="$i18n.locale = 'ru'">Ru</button>
    <button @click="$i18n.locale = 'en'">En</button>

    <button @click="myFunc(525)">Alert</button>

    <h3>{{$t('hello')}}</h3>

    <h1> AAA: {{ storeCounter.doubleCount }} </h1>

    <button @click.prevent="storeCounter.increment" class="btn btn-primary btn-sm">Increment</button>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </div>
      </div>
    </div>

  </main>
</template>
