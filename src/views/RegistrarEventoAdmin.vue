<template>
  <div class="min-h-screen flex justify-center items-center p-6">
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Registrar Evento Manual</h2>

      <form @submit.prevent="registrarEvento" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Placa</label>
          <input
            v-model="placa"
            type="text"
            required
            placeholder="Ej: ABC123"
            class="mt-1 w-full border rounded p-2 focus:outline-none focus:ring text-black uppercase"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Tipo de Vehículo</label>
          <select
            v-model="tipo_vehiculo"
            required
            class="mt-1 w-full border rounded p-2 focus:outline-none focus:ring text-black"
          >
            <option disabled value="">Seleccione</option>
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Evento</label>
          <select
            v-model="evento"
            required
            class="mt-1 w-full border rounded p-2 focus:outline-none focus:ring text-black"
          >
            <option disabled value="">Seleccione</option>
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Registrar Evento
        </button>

        <p v-if="mensaje" :class="`text-sm text-center mt-4 ${error ? 'text-red-600' : 'text-green-600'}`">
          {{ mensaje }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const placa = ref('')
const tipo_vehiculo = ref('')
const evento = ref('')
const mensaje = ref('')
const error = ref(false)

const registrarEvento = async () => {
  mensaje.value = ''
  error.value = false

  try {
    const res = await axios.post(`${apiUrl}/evento/manual`, {
      placa: placa.value,
      tipo_vehiculo: tipo_vehiculo.value,
      evento: evento.value,
      hora: new Date().toISOString()
    })

    mensaje.value = res.data.mensaje || 'Evento registrado exitosamente.'
    error.value = false

    // limpiar campos
    placa.value = ''
    tipo_vehiculo.value = ''
    evento.value = ''
  } catch (err: any) {
    error.value = true
    mensaje.value = err.response?.data?.detail || 'Error al registrar evento.'
  }
}
</script>
