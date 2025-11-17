<template>
  <div class="w-full min-h-screen p-6">
    <h1 class="text-4xl font-bold text-white mb-6">Parqueadero Inteligente</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Tarjeta de Disponibilidad -->
      <div v-if="disponibilidad" class="bg-white shadow-md rounded-xl p-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Disponibilidad actual</h2>
        <div class="grid grid-cols-2 gap-4 text-center">
          <div class="bg-blue-100 p-4 rounded-lg flex items-center justify-center space-x-8">
            <svg width="64" height="64" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.6667 58.6667L34.6667 34.6667H93.3333L101.333 58.6667M93.3333 85.3334C91.2116 85.3334 89.1768 84.4905 87.6765 82.9902C86.1762 81.4899 85.3333 79.4551 85.3333 77.3334C85.3333 75.2116 86.1762 73.1768 87.6765 71.6765C89.1768 70.1762 91.2116 69.3334 93.3333 69.3334C95.4551 69.3334 97.4899 70.1762 98.9902 71.6765C100.49 73.1768 101.333 75.2116 101.333 77.3334C101.333 79.4551 100.49 81.4899 98.9902 82.9902C97.4899 84.4905 95.4551 85.3334 93.3333 85.3334ZM34.6667 85.3334C32.5449 85.3334 30.5101 84.4905 29.0098 82.9902C27.5095 81.4899 26.6667 79.4551 26.6667 77.3334C26.6667 75.2116 27.5095 73.1768 29.0098 71.6765C30.5101 70.1762 32.5449 69.3334 34.6667 69.3334C36.7884 69.3334 38.8232 70.1762 40.3235 71.6765C41.8238 73.1768 42.6667 75.2116 42.6667 77.3334C42.6667 79.4551 41.8238 81.4899 40.3235 82.9902C38.8232 84.4905 36.7884 85.3334 34.6667 85.3334ZM100.907 32C99.84 28.9067 96.8533 26.6667 93.3333 26.6667H34.6667C31.1467 26.6667 28.16 28.9067 27.0933 32L16 64V106.667C16 108.081 16.5619 109.438 17.5621 110.438C18.5623 111.438 19.9188 112 21.3333 112H26.6667C28.0812 112 29.4377 111.438 30.4379 110.438C31.4381 109.438 32 108.081 32 106.667V101.333H96V106.667C96 108.081 96.5619 109.438 97.5621 110.438C98.5623 111.438 99.9188 112 101.333 112H106.667C108.081 112 109.438 111.438 110.438 110.438C111.438 109.438 112 108.081 112 106.667V64L100.907 32Z" fill="#408FFF"/>
            </svg>
            <div>
            <p class="text-lg font-medium text-blue-900">Carros</p>
            <p class="text-3xl font-bold text-blue-800">
              {{ disponibilidad.puestos_carro_disponibles }}/4
            </p>
            </div>
          </div>
          <div class="bg-green-100 p-4 rounded-lg flex items-center justify-center space-x-8">
            <svg width="64" height="64" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M44.613 53.3333L59.733 42.6667H78.357L72.533 26.6667H58.6664V16H79.9997L85.8237 32H106.666V48H91.6477L99.413 69.344C105.305 69.5313 110.922 71.8806 115.193 75.9439C119.464 80.0073 122.09 85.5003 122.571 91.3758C123.051 97.2512 121.352 103.098 117.798 107.801C114.244 112.504 109.083 115.735 103.3 116.877C97.5168 118.019 91.5154 116.993 86.4403 113.994C81.3652 110.995 77.5714 106.233 75.7823 100.616C73.9933 94.9985 74.3341 88.9196 76.7398 83.5377C79.1455 78.1559 83.4478 73.8477 88.8264 71.4347L82.2344 53.3333H77.1837L68.7464 84.64L53.1464 90.3413C53.2708 91.3227 53.333 92.32 53.333 93.3333C53.3317 97.733 52.121 102.048 49.8332 105.806C47.5455 109.564 44.2687 112.621 40.361 114.642C36.4533 116.664 32.0651 117.573 27.676 117.269C23.2868 116.965 19.0656 115.461 15.4737 112.92C11.8817 110.379 9.05731 106.9 7.30907 102.863C5.56084 98.8252 4.95607 94.3849 5.56084 90.027C6.16562 85.6691 7.95668 81.5613 10.7383 78.1526C13.5199 74.7438 17.185 72.1652 21.333 70.6987V64H10.6664V53.3333H44.613ZM29.333 106.667C32.8692 106.667 36.2606 105.262 38.7611 102.761C41.2616 100.261 42.6664 96.8696 42.6664 93.3333C42.6664 89.7971 41.2616 86.4057 38.7611 83.9052C36.2606 81.4048 32.8692 80 29.333 80C25.7968 80 22.4054 81.4048 19.9049 83.9052C17.4044 86.4057 15.9997 89.7971 15.9997 93.3333C15.9997 96.8696 17.4044 100.261 19.9049 102.761C22.4054 105.262 25.7968 106.667 29.333 106.667ZM98.6664 106.667C102.203 106.667 105.594 105.262 108.094 102.761C110.595 100.261 112 96.8696 112 93.3333C112 89.7971 110.595 86.4057 108.094 83.9052C105.594 81.4048 102.203 80 98.6664 80C95.1301 80 91.7387 81.4048 89.2383 83.9052C86.7378 86.4057 85.333 89.7971 85.333 93.3333C85.333 96.8696 86.7378 100.261 89.2383 102.761C91.7387 105.262 95.1301 106.667 98.6664 106.667Z" fill="#23F487"/>
</svg>
<div>
            <p class="text-lg font-medium text-green-900">Motos</p>
            <p class="text-3xl font-bold text-green-800">
              {{ disponibilidad.puestos_moto_disponibles }}/5
            </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta de Pico y Placa -->
      <div v-if="picoPlaca" class="bg-white shadow-md rounded-xl p-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Pico y Placa del día</h2>
        <p class="text-gray-600 mb-2 text-3xl">
          Hoy es <strong>{{ dias[picoPlaca.dia] }}</strong>
        </p>
        <div
  class="bg-yellow-400 border-4 border-black rounded-md text-center py-4 px-6 font-bold text-2xl tracking-widest shadow-inner placa-colombiana"
  v-if="picoPlaca.placas_restringidas.length > 0"
>
          <p class="text-black text-4xl font-bold">
            {{ picoPlaca.placas_restringidas.join(" - ") }}
          </p>
        </div>
        <div v-else>
          <p class="text-green-600 font-medium">Hoy no hay pico y placa 🚗🛵</p>
        </div>
      </div>

      <!-- Tarjeta de Vehículos activos del usuario -->
      <div v-if="vehiculosActivos.length" class="bg-white shadow-md rounded-xl p-6 mt-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Tus vehículos dentro del parqueadero</h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="vehiculo in vehiculosActivos" :key="vehiculo.placa" class="py-3">
            <p class="text-gray-800 font-medium">🚘 {{ vehiculo.tipo }} - {{ vehiculo.placa }}</p>
            <p class="text-sm text-gray-600">Entrada: {{ new Date(vehiculo.hora_entrada).toLocaleString() }}</p>
            <p class="text-sm text-blue-600 font-semibold">Tiempo actual: {{ calcularTiempo(vehiculo.hora_entrada) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default {
  name: "HomeView",
  data() {
    return {
      disponibilidad: null,
      picoPlaca: null,
      vehiculosActivos: [],
      dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    };
  },
  mounted() {
    this.cargarDisponibilidad();
    this.cargarPicoYPlaca();
    this.cargarVehiculosActivos();
    // Actualizar cada 60 segundos
  setInterval(() => {
    this.cargarDisponibilidad();
    this.cargarVehiculosActivos();
  }, 60000);
  },
  methods: {
    async cargarDisponibilidad() {
      try {
        const res = await axios.get(`${apiUrl}/disponibilidad`);
        this.disponibilidad = res.data;
        console.log("[INFO] Disponibilidad cargada:", this.disponibilidad);
      } catch (error) {
        console.error("[ERROR] No se pudo obtener la disponibilidad:", error);
      }
    },
    async cargarPicoYPlaca() {
      try {
        const res = await axios.get(`${apiUrl}/pico-y-placa`);
        this.picoPlaca = res.data;
      } catch (error) {
        console.error("[ERROR] No se pudo obtener pico y placa:", error);
      }
    },
    async cargarVehiculosActivos() {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario?.telefono) return;
      try {
        const res = await axios.get(`${apiUrl}/usuario/${usuario.telefono}/vehiculos-activos`);
        this.vehiculosActivos = res.data;
      } catch (error) {
        console.error("[ERROR] No se pudo obtener vehículos activos:", error);
      }
    },
    calcularTiempo(hora) {
      const entrada = new Date(hora);
      const ahora = new Date();
      const diff = Math.floor((ahora - entrada) / 60000); // minutos
      const horas = Math.floor(diff / 60);
      const minutos = diff % 60;
      return `${horas}h ${minutos}min`;
    }
  }
};
</script>
