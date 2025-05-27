<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Registrar Vehículo</h2>

      <form @submit.prevent="registrarVehiculo" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Placa</label>
          <input
            v-model="placa"
            type="text"
            required
            placeholder="ABC123"
            class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:outline-none uppercase"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Tipo de vehículo</label>
          <select
            v-model="tipoVehiculo"
            required
            class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:outline-none"
          >
            <option value="" disabled>Seleccione</option>
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
          </select>
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Registrar vehículo
        </button>
      </form>

      <p
        v-if="mensaje"
        :class="mensajeError ? 'text-red-600' : 'text-green-600'"
        class="mt-4 text-center"
      >
        {{ mensaje }}
      </p>

      <!-- Lista de vehículos -->
      <div v-if="vehiculos.length" class="mt-8">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Tus vehículos registrados</h3>
        <ul class="space-y-2">
          <li
            v-for="vehiculo in vehiculos"
            :key="vehiculo.placa"
            class="border p-3 rounded bg-gray-50 text-gray-700"
          >
            <span class="font-semibold">Placa:</span> {{ vehiculo.placa }} |
            <span class="font-semibold">Tipo:</span> {{ vehiculo.tipo_vehiculo }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const placa = ref('')
const tipoVehiculo = ref('')
const mensaje = ref('')
const mensajeError = ref(false)
const vehiculos = ref<{ placa: string, tipo_vehiculo: string }[]>([])

const cargarVehiculos = async () => {
  if (!userStore.user) return
  try {
    const res = await axios.get(`http://localhost:8000/vehiculos/${userStore.user.telefono}`)
    vehiculos.value = res.data
  } catch (error) {
    console.error('Error cargando vehículos', error)
  }
}

const registrarVehiculo = async () => {
  if (!userStore.user) {
    mensaje.value = 'Debes iniciar sesión para registrar un vehículo.'
    mensajeError.value = true
    return router.push('/login')
  }

  // Validación local: evitar duplicados
  const existe = vehiculos.value.find(v => v.placa.toUpperCase() === placa.value.toUpperCase())
  if (existe) {
    mensaje.value = 'Ya tienes registrado un vehículo con esta placa.'
    mensajeError.value = true
    return
  }

  try {
    await axios.post('http://localhost:8000/vehiculo', {
      telefono: userStore.user.telefono,
      vehiculo: {
        placa: placa.value.toUpperCase(),
        tipo_vehiculo: tipoVehiculo.value
      }
    })

    mensaje.value = 'Vehículo registrado correctamente.'
    mensajeError.value = false
    placa.value = ''
    tipoVehiculo.value = ''
    await cargarVehiculos()
  } catch (error: any) {
    mensaje.value = error.response?.data?.detail || 'Error al registrar vehículo.'
    mensajeError.value = true
  }
}

onMounted(() => {
  if (userStore.user) {
    cargarVehiculos()
  }
})
</script>
