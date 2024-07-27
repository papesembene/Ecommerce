<template>
  <div>
    <br>
    <button type="button" class="btn btn-primary" @click="showClientTypeModal">
      TERMINER L'ACHAT
    </button>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  props: ['cartItems', 'totalAmount'],
  setup(props) {
    const router = useRouter();
    const formData = ref({
      name: '',
      firstname: '',
      email: '',
      city: '',
      address: '',
      phone_number: '',
    });

    const showClientTypeModal = async () => {
      const { value: clientType } = await Swal.fire({
        title: 'Êtes-vous un nouveau client ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui, je suis nouveau',
        cancelButtonText: 'Non, j\'ai déjà commandé'
      });

      if (clientType) {
        showNewClientForm();
      } else {
        showExistingClientForm();
      }
    };

    const showNewClientForm = async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Informations du client',
        html:
          '<input id="swal-name" class="swal2-input" placeholder="Nom">' +
          '<input id="swal-firstname" class="swal2-input" placeholder="Prénom">' +
          '<input id="swal-email" class="swal2-input" placeholder="Email">' +
          '<input id="swal-city" class="swal2-input" placeholder="Ville">' +
          '<input id="swal-address" class="swal2-input" placeholder="Adresse">' +
          '<input id="swal-phone" class="swal2-input" placeholder="Numéro de téléphone">',
        focusConfirm: false,
        preConfirm: () => {
          return {
            name: document.getElementById('swal-name').value,
            firstname: document.getElementById('swal-firstname').value,
            email: document.getElementById('swal-email').value,
            city: document.getElementById('swal-city').value,
            address: document.getElementById('swal-address').value,
            phone_number: document.getElementById('swal-phone').value
          }
        }
      });

      if (formValues) {
        Object.assign(formData.value, formValues);
        submitForm();
      }
    };

    const showExistingClientForm = async () => {
      const { value: phone } = await Swal.fire({
        title: 'Entrez votre numéro de téléphone',
        input: 'text',
        inputPlaceholder: 'Numéro de téléphone'
      });

      if (phone) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/customers/${phone}`);
          if (response.data.success) {
            Object.assign(formData.value, response.data.customer);
            submitForm();
          } else {
            Swal.fire('Erreur', 'Aucun client trouvé avec ce numéro de téléphone', 'error');
          }
        } catch (error) {
          console.error('Error fetching client info:', error);
          Swal.fire('Erreur', 'Une erreur est survenue lors de la récupération des informations du client', 'error');
        }
      }
    };

    const submitForm = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/orders/store', {
          ...formData.value,
          total_amount: props.totalAmount,
          products: props.cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        });

        if (response.data.success) {
          await Swal.fire({
            title: 'Commande créée !',
            text: 'Votre commande a été reçue et est en attente de traitement.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          
          localStorage.setItem('lastOrderId', response.data.order.id);
          localStorage.removeItem('cart');
          router.push({ name: 'OrderConfirmation', params: { id: response.data.order.id } });
        } else {
          await Swal.fire({
            title: 'Erreur',
            text: response.data.message,
            icon: 'error'
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        let errorMessage = 'Une erreur est survenue lors du traitement de votre commande.';
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          errorMessage = 'Erreurs de validation:\n' + errorMessages.join('\n');
        }
        await Swal.fire({
          title: 'Erreur',
          text: errorMessage,
          icon: 'error'
        });
      }
    };

    return {
      formData,
      showClientTypeModal
    };
  }
}
</script>
