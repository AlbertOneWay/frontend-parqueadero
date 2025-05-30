<script setup>
import SidebarMenu from './components/SideBarMenu.vue';
</script>

<template>
  <div class="flex">
    <SidebarMenu />
    <div class=" flex flex-col flex-1 min-w-0 h-screen overflow-hidden p-5 bg-slate-900 text-white">
      <RouterView />
    </div>
  </div>
  <img
      src="/assets/img/Logo_de_la_Universidad_de_Caldas.svg.png"
      alt="Logo"
      class="fixed right-6 bottom-6 w-20 h-20 rounded-full shadow-lg z-50"
      style="pointer-events: none;"
    />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
