<script setup>
    import { useAuthStore } from "@/stores/auth"
    import $ from "jQuery"
    const storeAuth = useAuthStore()
    function logout(){
        $(".offcanvas-backdrop").remove();
        storeAuth.logout();
    }
</script>

<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">{{ $t('finance') }}
                <button 
                    id="hmbrgrButton"
                    class="btn"
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasExample" 
                    aria-controls="offcanvasExample"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>  
            </a>
        </div>
    </nav>
    
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style="overflow-y:auto">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 100%;">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
            <span class="fs-4">{{ $t('menu') }}</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" aria-current="page">
                        <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"/></svg>
                        {{ $t('dashboard') }}
                    </router-link>
                </li>
                <li v-if="storeAuth.can('See users')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg>
                        {{ $t('users') }}
                    </a>
                </li>
                <li v-if="storeAuth.can('See roles')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"/></svg>
                        {{ $t('roles') }}
                    </a>
                </li>
                <li v-if="storeAuth.can('See currencies')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"/></svg>
                        {{ $t('currencies') }}
                    </a>
                </li>
                <li v-if="storeAuth.can('See firms')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                        {{ $t('firms') }}
                    </a>
                </li>
                <li v-if="storeAuth.can('See wallets')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                        {{ $t('wallets') }}
                    </a>
                </li>
                <li v-if="storeAuth.can('See categories')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                        {{ $t('categories') }}
                    </a>
                </li>
                <li v-if="storeAuth.can('See payment methods')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                        {{ $t('payment-methods') }}
                    </a>
                </li>
                <li v-if="storeAuth.can('See transactions')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                        {{ $t('transactions') }}
                    </a>
                </li>
                <li v-if="storeAuth.can('See exchange-rates')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                        {{ $t('exchange-rates') }}
                    </a>
                </li>
                <li v-if="storeAuth.can('See history')">
                    <a href="#" class="nav-link link-dark">
                    <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                        {{ $t('news-feed') }}
                    </a>
                </li>
            </ul>
            <hr>
            <div class="dropdown">
            <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/user.png" alt="" width="32" height="32" class="rounded-circle me-2">
                <strong>{{ storeAuth.currentUser.name }}</strong>
            </a>
            <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                <li><a class="dropdown-item" href="#">{{ $t('settings') }}</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click.prevent="logout">{{ $t('logout') }}</a></li>
            </ul>
            </div>
        </div>
    </div>

    <div class="container" style="overflow-y:auto">
        <router-view></router-view> 
    </div>
</template>

<style lang="scss" scoped>
    #hmbrgrButton{
        padding: 3px;
        &:focus{
            box-shadow:none
        }
    }
</style>

<style>
    body{
        padding-top: 60px!important;
    }
</style>