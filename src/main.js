import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js";
import {startTokenRefreshInterval} from "./refreshToken.js";

const app = createApp(App);
// Ajoute le router à l'application
//app.use(router);

createApp(App).use(router).mount('#app')

startTokenRefreshInterval();