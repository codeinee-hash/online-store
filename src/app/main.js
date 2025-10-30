import './main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/home-page.vue';
import FavoritesPage from '@/pages/favorites-page.vue';
import OrdersPage from '@/pages/orders-page.vue';

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/orders', component: OrdersPage, name: 'orders' },
  { path: '/favorites', component: FavoritesPage, name: 'favorites' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(autoAnimatePlugin);
app.mount('#app');
