<script setup>
import SidebarMenu from '@/components/SidebarMenu.vue';
</script>

<template>
  <div class="flex">
    <SidebarMenu />
    <div class=" flex flex-col flex-1 min-w-0 h-screen overflow-hidden p-5 bg-slate-900 text-white">
      <RouterView />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
