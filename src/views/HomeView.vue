<template>
  <div class="w-full min-h-screen p-6">
    <h1 class="text-4xl font-bold text-white mb-6">Parqueadero Inteligente</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Tarjeta de Disponibilidad -->
      <div v-if="disponibilidad" class="bg-white shadow-md rounded-xl p-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Disponibilidad actual</h2>
        <div class="grid grid-cols-2 gap-4 text-center">
          <div class="bg-blue-100 p-4 rounded-lg">
            <p class="text-lg font-medium text-blue-900">Carros</p>
            <p class="text-3xl font-bold text-blue-800">
              {{ disponibilidad.puestos_carro_disponibles }}/24
            </p>
          </div>
          <div class="bg-green-100 p-4 rounded-lg">
            <p class="text-lg font-medium text-green-900">Motos</p>
            <p class="text-3xl font-bold text-green-800">
              {{ disponibilidad.puestos_moto_disponibles }}/50
            </p>
          </div>
        </div>
      </div>

      <!-- Tarjeta de Pico y Placa -->
      <div v-if="picoPlaca" class="bg-white shadow-md rounded-xl p-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Pico y Placa del día</h2>
        <p class="text-gray-600 mb-2">
          Hoy es <strong>{{ dias[picoPlaca.dia] }}</strong>
        </p>
        <div v-if="picoPlaca.placas_restringidas.length > 0">
          <p class="text-red-600 font-semibold">
            Placas restringidas: {{ picoPlaca.placas_restringidas.join(", ") }}
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
    this.iniciarSSE(); 
    this.cargarPicoYPlaca();
    this.cargarVehiculosActivos();
  },
  methods: {
      async iniciarSSE() {
  const eventSource = new EventSource(`${apiUrl}/sse/disponibilidad`);

  // ✅ Este evento se dispara cuando la conexión se abre correctamente
  eventSource.onopen = () => {
    console.log("[SSE] Conexión SSE abierta correctamente");
  };

  eventSource.onmessage = (event) => {
    try {
      this.disponibilidad = JSON.parse(event.data);
      console.log("[SSE] Nueva disponibilidad:", this.disponibilidad);
      this.cargarVehiculosActivos(); // Actualiza vehículos del usuario
    } catch (e) {
      console.error("[SSE] Error al parsear datos:", e);
    }
  };

  eventSource.onerror = (error) => {
    console.error("[SSE] Conexión cerrada o fallida:", error);
    eventSource.close();
  };
}
,
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
