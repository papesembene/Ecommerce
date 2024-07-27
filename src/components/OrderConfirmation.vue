<template>
    <br><br><br><br><br>
    <div class="order-confirmation-container">
      <div v-if="orderLoaded" class="order-confirmation">
        <div class="confirmation-header">
          <h1>Merci pour votre commande !</h1>
          <p class="order-id">Numéro de commande : <span>#{{ orderId }}</span></p>
        </div>
        
        <div class="confirmation-details">
          <div class="confirmation-message">
            <p>Un email de confirmation a été envoyé à l'adresse fournie avec les détails de votre commande.</p>
            <p>Vous pouvez suivre l'état de votre commande dans votre espace client.</p>
          </div>
  
          <div class="estimated-delivery">
            <h2>Date de livraison estimée au plus </h2>
            <p class="delivery-date">{{ estimatedDeliveryDate }}</p>
          </div>
  
          <div class="order-summary">
            <h2>Résumé de la commande</h2>
            <ul class="item-list">
              <li v-for="item in orderItems" :key="item.id" class="item">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-quantity">Quantité: {{ item.quantity }}</span>
                <span class="item-price">{{ item.price }} FCFA</span>
              </li>
            </ul>
            <p class="order-total">Total: <strong>{{ orderTotal }} FCFA</strong></p>
          </div>
  
          <div class="next-steps">
            <h2>Prochaines étapes</h2>
            <ol>
              <li>Vous recevrez un email de confirmation sous peu.</li>
              <li>Nous vous informerons lorsque votre commande sera expédiée.</li>
              <li>Vous pourrez suivre votre colis en utilisant le numéro de suivi qui vous sera fourni.</li>
            </ol>
          </div>
        </div>
  
        <router-link to="/account/orders" class="btn-view-orders">Voir mes commandes</router-link>
      </div>
      <div v-else class="loading">Chargement des détails de la commande...</div>
    </div>
  </template>
 <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    setup() {
      const route = useRoute();
      const orderId = ref(route.params.id);
      const estimatedDeliveryDate = ref('');
      const orderItems = ref([]);
      const orderTotal = ref(0);
      const orderLoaded = ref(false);
  
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/orders/${orderId.value}`);
          console.log('Order data:', response.data);
  
          estimatedDeliveryDate.value = new Date(response.data.estimatedDeliveryDate).toLocaleDateString();
          orderItems.value = response.data.items;
          orderTotal.value = response.data.totalAmount;
          orderLoaded.value = true;
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };
  
      onMounted(() => {
        fetchOrderDetails();
      });
  
      return {
        orderId,
        estimatedDeliveryDate,
        orderItems,
        orderTotal,
        orderLoaded
      };
    }
  }
  </script>
  
<style scoped>
.order-confirmation-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.order-confirmation {
  font-family: Arial, sans-serif;
  color: #333;
}

.confirmation-header {
  text-align: center;
  margin-bottom: 2rem;
}

.confirmation-header h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.order-id {
  font-size: 1.1rem;
}

.order-id span {
  font-weight: bold;
  color: #3498db;
}

.confirmation-details {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.confirmation-message, .estimated-delivery, .order-summary, .next-steps {
  margin-bottom: 2rem;
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.delivery-date {
  font-size: 1.2rem;
  font-weight: bold;
  color: #27ae60;
}

.item-list {
  list-style-type: none;
  padding: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ecf0f1;
}

.item-name {
  flex: 2;
}

.item-quantity, .item-price {
  flex: 1;
  text-align: right;
}

.order-total {
  text-align: right;
  font-size: 1.2rem;
  margin-top: 1rem;
}

.next-steps ol {
  padding-left: 1.5rem;
}

.next-steps li {
  margin-bottom: 0.5rem;
}

.btn-view-orders {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-view-orders:hover {
  background-color: #2980b9;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
}
</style>