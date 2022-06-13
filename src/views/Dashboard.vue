<script setup>
import { useAuthStore } from '@/stores/auth'

const storeAuth = useAuthStore()
</script>

<template>

  <div class="row mt-3">
    <div 
      v-if="storeAuth.can('See users')"
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('users')}}
        </div>
      </router-link>
    </div>
    <div 
      v-if="storeAuth.can('See roles')"  
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('roles')}}
        </div>
      </router-link>
    </div>
    <div 
      v-if="storeAuth.can('See currencies')"
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('currencies')}}
        </div>
      </router-link>
    </div>
    <div 
      v-if="storeAuth.can('See firms')"
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('firms')}}
        </div>
      </router-link>
    </div>
    <div 
      v-if="storeAuth.can('See wallets')"
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('wallets')}}
        </div>
      </router-link>
    </div>
    <div 
      v-if="storeAuth.can('See categories')"
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('categories')}}
        </div>
      </router-link>
    </div>
    <div 
      v-if="storeAuth.can('See payment methods')"
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('payment-methods')}}
        </div>
      </router-link>
    </div>
    <div 
      v-if="storeAuth.can('See transactions')"
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('transactions')}}
        </div>
      </router-link>
    </div>
    <div 
      v-if="storeAuth.can('See exchange rates')"
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('exchange-rates')}}
        </div>
      </router-link>
    </div>
    <div 
      v-if="storeAuth.can('See history')"  
      class="col-md-4 mt-2"
    >
      <router-link to="/" tag="div" class="card">
        <div class="card-body">
          {{$t('news-feed')}}
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  a{
    text-align: center;
    text-decoration: none;
    transition: all 0.5s;
    &:hover{
      box-shadow: 0 0 5px 3px #ddd;
    }
  }
</style> 
