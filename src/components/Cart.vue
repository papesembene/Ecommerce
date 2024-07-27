<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import CheckoutModal from '../components/CheckoutModal.vue'; // Importer le composant CheckoutModal
const checkoutModal = ref(null);

    const openCheckoutModal = () => {
      checkoutModal.value.show();
    };
const router = useRouter();
const updateCartCount = inject('updateCartCount');
const cartItems = ref([]);

const fetchCartItems = () => {
  cartItems.value = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount(cartItems.value.reduce((total, item) => total + item.quantity, 0));
};

const getImageUrl = (imagePath) => {
  return `http://127.0.0.1:8000/storage/${imagePath}`;
};

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

const increaseQuantity = (item) => {
  item.quantity++;
  updateCart();
  location.reload();
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
    updateCart();
    location.reload();
  }
};

const removeItem = (item) => {
  const index = cartItems.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
    updateCart();
    location.reload();
  }

};

const updateCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
  updateCartCount(cartItems.value.reduce((total, item) => total + item.quantity, 0));
  location.reload();
};

const continueShopping = () => {
  router.push('/shop');
};

const processCheckout = () => {
  // Implement checkout logic here
  console.log('Processing checkout...');
  // You might want to redirect to a checkout page or show a modal
};

onMounted(() => {
  fetchCartItems();
});


</script>

<template>
  <br>
  <br>
  <br>
  <div class="cart-page">
    <h2> TOUS LES PRODUITS</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Votre panier est vide. Commencez vos achats maintenant !</p>
      <button @click="continueShopping" class="continue-shopping">ALLER À LA BOUTIQUE</button>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="getImageUrl(item.photo)" :alt="item.name" class="product-image">
        <div class="product-details">
          <h3>{{ item.name }}</h3>
          <p class="price">{{ item.price.toFixed(2) }}FCFA</p>
        </div>
        <div class="quantity-control">
          <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item)">+</button>
        </div>
        <p class="total">{{ (item.price * item.quantity).toFixed(2) }}FCFA</p>
        <button @click="removeItem(item)" class="remove-item" aria-label="Remove item">×</button>
      </div>
      <div class="cart-summary">
        <p class="total-price">TOTAL À PAYER: {{ totalPrice.toFixed(2) }}FCFA </p>
        <button @click="continueShopping" class="continue-shopping">CONTINUE SHOPPING</button>
       <!--  <button @click="openCheckoutModal" class="process-checkout">PROCESS TO CHECKOUT</button> -->
       <CheckoutModal :cartItems="cartItems" :totalAmount="totalPrice" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

.empty-cart {
  text-align: center;
  padding: 50px 0;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.product-details {
  flex-grow: 1;
}

.product-details h3 {
  margin: 0;
  font-size: 18px;
}

.price {
  color: #888;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.quantity-control button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-control span {
  margin: 0 10px;
  font-size: 16px;
}

.total {
  font-weight: bold;
  font-size: 18px;
  margin: 0 20px;
}

.remove-item {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #ff0000;
}

.cart-summary {
  margin-top: 30px;
  text-align: right;
}

.cart-summary input {
  padding: 10px;
  margin-bottom: 10px;
  width: 200px;
}

.total-price {
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
}

.continue-shopping,
.process-checkout {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.continue-shopping {
  background-color: #f0f0f0;
  color: #333;
  margin-right: 10px;
}

.continue-shopping:hover {
  background-color: #e0e0e0;
}

.process-checkout {
  background-color: #4CAF50;
  color: white;
}

.process-checkout:hover {
  background-color: #45a049;
}
</style>