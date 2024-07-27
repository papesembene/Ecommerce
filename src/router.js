import Home from "./Pages/Home.vue";
import Cart from "./components/Cart.vue";
import Products from "./Pages/Product.vue";
import About from "./Pages/About.vue";
import Contact from "./Pages/Contact.vue";
import Login from "./Pages/Login.vue";
import OrderConfirmation from './components/OrderConfirmation.vue';

import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/shop',
        component: Products
    },
    ,
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/contact',
        component: Contact
    }
    ,
    {
        path: '/login',
        component: Login
    }
    ,
    {
        path: '/order-confirmation/:id',
        name: 'OrderConfirmation',
        component: OrderConfirmation
       
      },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});




export default router;