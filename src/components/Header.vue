<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartItems = ref([]);

const updateCartCount = () => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.value = storedCart;
};

const cartCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

onMounted(() => {
  updateCartCount();
  window.addEventListener('storage', updateCartCount);
});

</script>

<template>
  <header id="header">
    <div class="container">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <!-- Logo -->
          <a class="logo" href="#"><img src="/images/logobi.png" alt="logo" width="50px" ></a>Watch World
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
            aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar"><i class="icofont-navigation-menu"></i></span>
          </button>
          <!-- navbar links -->

          <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link active" data-scroll-nav="0">Acceuil</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link" data-scroll-nav="2">À propos</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/shop" class="nav-link" data-scroll-nav="3">Produits</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/contact" class="nav-link" data-scroll-nav="6">Contact</router-link>
              </li>
            </ul>
            <div class="navbar-nav ml-auto">
              <li class="nav-item cart-item">
                <router-link to="/cart" class="nav-link">
                  <i class="icon-shopping-cart2"></i>
                  <span class="cart-count">{{ cartCount }}</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Se connecter</router-link>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Add your header styles here */
</style>