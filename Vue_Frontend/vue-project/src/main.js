import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router/index.js";
import './assets/main.css'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");