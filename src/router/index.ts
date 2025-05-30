import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterVehicleView from '@/views/RegisterVehicleView.vue'
import HistorialVehiculosView from '@/views/HistorialVehiculosView.vue'
import RegistrarEventoAdmin from '@/views/RegistrarEventoAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    { path: '/registro', name: 'Registro', component: RegisterView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/registrar-vehiculo', name: 'RegistrarVehiculo', component: RegisterVehicleView},
    { path: '/historial-vehiculos', name: 'HistorialVehiculos', component: HistorialVehiculosView},
    { path: '/registrar-evento', name: 'RegistrarEvento', component: RegistrarEventoAdmin}
  ],
})

export default router
