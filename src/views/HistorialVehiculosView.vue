<template>
  <div class="min-h-screen p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6 text-white text-center">📋 Historial de Mis Vehículos</h1>

      <!-- Filtro por placa -->
      <div class="mb-6 text-center">
        <label class="block text-sm font-medium text-white mb-2">Filtrar por vehículo</label>
        <select
          v-model="placaSeleccionada"
          @change="fetchHistorial"
          class="w-full max-w-xs mx-auto p-2 border border-gray-300 rounded-md text-gray-700"
        >
          <option value="">Todos</option>
          <option v-for="veh in vehiculos" :key="veh.placa" :value="veh.placa">
            {{ veh.placa }}
          </option>
        </select>
      </div>

      <div v-if="loading" class="text-center text-white">Cargando historial...</div>
      <div v-else-if="historial.length === 0" class="text-center text-gray-500">No hay eventos registrados.</div>

      <div v-else class="space-y-8">
        <div
          v-for="evento in historial"
          :key="evento._id"
          class="bg-white shadow-md rounded-lg p-4 border-l-4"
          :class="evento.evento === 'entrada' ? 'border-green-500' : 'border-red-500'"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-800 font-semibold">🚗 Placa: {{ evento.placa }}</p>
              <p class="text-sm text-gray-600">Tipo: {{ evento.tipo_vehiculo }}</p>
              <p class="text-sm text-gray-600">Evento: 
                <span :class="evento.evento === 'entrada' ? 'text-green-600' : 'text-red-600'">
                  {{ evento.evento }}
                </span>
              </p>
            </div>
            <div class="text-right text-sm text-gray-500">
              {{ formatDate(evento.hora) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const apiUrl = import.meta.env.VITE_API_URL

const historial = ref<any[]>([])
const vehiculos = ref<any[]>([])
const loading = ref(true)
const placaSeleccionada = ref<string>('')

const formatDate = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleString()
}

const fetchVehiculos = async () => {
  try {
    const res = await axios.get(`${apiUrl}/vehiculos/${userStore.user?.telefono}`)
    vehiculos.value = res.data
  } catch (e) {
    console.error('Error al obtener vehículos:', e)
  }
}

const fetchHistorial = async () => {
  loading.value = true
  historial.value = []

  if (!userStore.user?.telefono) return

  try {
    if (placaSeleccionada.value === '') {
      const res = await axios.get(`${apiUrl}/usuario/${userStore.user.telefono}/historial-eventos`)
      historial.value = res.data.historial || []
    } else {
      const res = await axios.get(`${apiUrl}/usuario/${userStore.user.telefono}/vehiculo/${placaSeleccionada.value}/historial`)
      historial.value = res.data.eventos || []
    }
  } catch (error) {
    console.error('Error al cargar historial:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchVehiculos()
  await fetchHistorial()
})
</script>

