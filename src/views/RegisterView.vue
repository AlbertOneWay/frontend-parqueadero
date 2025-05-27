<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Registro de Usuario</h2>
      <form @submit.prevent="registrarUsuario" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre</label>
          <input v-model="nombre" type="text" required
                 class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Teléfono</label>
          <input v-model="telefono" type="tel" required placeholder="+573001112233"
                 class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input v-model="password" type="password" required
                 class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring focus:outline-none" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Registrarse
        </button>
      </form>
      <p v-if="mensaje" class="mt-4 text-center text-green-600">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export default {
  name: 'RegisterView',
  data() {
    return {
      nombre: '',
      telefono: '',
      password: '',
      mensaje: ''
    };
  },
  methods: {
    async registrarUsuario() {
      try {
        await axios.post(`${apiUrl}/usuario`, {
          nombre: this.nombre,
          telefono: this.telefono,
          password: this.password
        });
        this.mensaje = 'Usuario registrado exitosamente';
        this.nombre = '';
        this.telefono = '';
        this.password = '';
      } catch (error) {
        this.mensaje = error.response?.data?.detail || 'Error al registrar';
      }
    }
  }
};
</script>
