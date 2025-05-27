<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre</label>
          <input v-model="nombre" type="text" required
                 class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input v-model="password" type="password" required
                 class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:outline-none" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Iniciar sesión
        </button>
      </form>
      <p v-if="mensaje" class="mt-4 text-center text-red-600">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

const apiUrl = import.meta.env.VITE_API_URL;
const nombre = ref('')
const password = ref('')
const mensaje = ref('')
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  try {
    const res = await axios.post(`${apiUrl}/login`, {
      nombre: nombre.value,
      password: password.value
    })

    userStore.login(res.data)
    router.push('/')
  } catch (error: any) {
    mensaje.value = error.response?.data?.detail || 'Datos incorrectos'
  }
}
</script>
