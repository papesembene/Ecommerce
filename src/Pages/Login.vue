<script>

import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      axios.post('http://127.0.0.1:8000/api/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      
        // token expire après 1 heure
       // localStorage.setItem('tokenExpiration', Date.now() + 3600 * 1000);
        this.$router.push('/index');
      })
      .catch(error => {
        alert('Informations Invalides');
       
      });
    }
  }
} 
</script>
<template>
  <div class="login-page">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-center mb-4">
            <span class="logo">Premat</span>
          </div>
          <div class="login-container">
            <h2 class="text-center mb-4">Connexion</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Adresse email</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
      
              <button type="submit" class="btn btn-primary w-100">Se connecter</button>
            </form>
            <p class="text-center mt-3">
              <a href="#" class="text-decoration-none">Mot de passe oublié?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.login-page {
  background-color: #FFF0F0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.logo {
  color: #FF5722;
  font-weight: bold;
  font-size: 24px;
}
.btn-primary {
  background-color: #FF5722;
  border-color: #FF5722;
}
.btn-primary:hover {
  background-color: #E64A19;
  border-color: #E64A19;
}
.login-container {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>