<script setup>
import { ref, provide } from 'vue';
import Header from './components/Header.vue';

const cartCount = ref(0);

const updateCartCount = (count) => {
  cartCount.value = count;
};

provide('updateCartCount', updateCartCount);
</script>

<template>
  <div id="app">
    <Header :cartCount="cartCount" />
    <router-view @update-cart="updateCartCount"></router-view>
  </div>
</template>

<style>
/* Styles globaux ici */
</style>