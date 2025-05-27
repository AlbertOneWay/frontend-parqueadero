import { defineStore } from 'pinia'

export interface Usuario {
  nombre: string
  telefono: string
}

export const useUserStore = defineStore('user', {
  state: (): { user: Usuario | null } => ({
    user: JSON.parse(localStorage.getItem('usuario') || 'null')
  }),
  actions: {
    login(userData: Usuario) {
      this.user = userData
      localStorage.setItem('usuario', JSON.stringify(userData))
    },
    logout() {
      this.user = null
      localStorage.removeItem('usuario')
    }
  }
})
