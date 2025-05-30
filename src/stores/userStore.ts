import { defineStore } from 'pinia'

export interface Usuario {
  nombre: string
  telefono: string
  rol: 'admin' | 'usuario'
}

export const useUserStore = defineStore('user', {
  state: (): { user: Usuario | null } => ({
    user: JSON.parse(localStorage.getItem('usuario') || 'null')
  }),
  actions: {
    login(userData: Usuario) {
      this.user = userData
      console.log('Usuario guardado en el store:', this.user)
      localStorage.setItem('usuario', JSON.stringify(userData))
    },
    logout() {
      this.user = null
      localStorage.removeItem('usuario')
    }
  }
})
