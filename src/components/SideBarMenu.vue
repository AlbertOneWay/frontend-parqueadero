<template>
  <div>
    <nav
      :class="toggleSidebar ? 'w-[220px]' : 'w-[76px]'"
      class="relative z-[51] flex-shrink-0 bg-blue-500 h-[100vh] isolate transition-all duration-200">
      <div class="h-full pt-4">
        <div class="flex flex-col justify-between h-full">
          <div class="flex-1 flex flex-col gap-4 overflow-y-auto">
            <div class="text-white w-full">
              <img
                src="/assets/img/ImageLogo.png"
                alt="Logo"
                class="w-4/5 h-full ml-2 rounded-full">
            </div>
            <SidebarMenuNav :toggle-sidebar="toggleSidebar" />
          </div>
          <ul class="text-white pt-9">
            <li class="group relative text-white">
              <div v-for="(item, index) in menuItems" :key="index">
                <div
                  :class="
                    isAnySubItemActive(item.subItems)
                      ? 'bg-[rgba(255,255,255,0.35)] group-hover:!bg-[rgba(255,255,255,0.35)]'
                      : ''
                  "
                  class="cursor-pointer text-white flex items-center h-12 gap-3 pl-6 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.25)] transition-all duration-200">
                  <div v-html="item.icon"></div>
                  <span v-if="toggleSidebar" class="whitespace-nowrap">
                    {{ item.title }}
                  </span>
                </div>
                <div
                  :class="toggleSidebar ? 'left-full' : 'left-[76px]'"
                  class="bg-[#3e4454] absolute bottom-0 opacity-0 pointer-events-none flex flex-col shadow-[4px_8px_30px_2px_rgb(0_0_0/60%)] min-w-[230px] transition-all duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto">
                  <ul>
                    <li
                      v-for="(subItem, subIndex) in item.subItems"
                      :key="subIndex"
                      class="relative"
                      :class="
                        isActive(subItem.link)
                          ? 'bg-[rgba(255,255,255,0.35)]'
                          : 'hover:bg-[rgba(248,250,252,0.20)]'
                      "
                    >
                      <a
                        :href="subItem.link"
                        class="flex flex-wrap text-sm px-3 py-4 transition-all duration-300 hover:text-white hover:bg-[rgba(248,250,252,0.20)]">
                        <span class="block w-full whitespace-nowrap truncate">
                          {{ subItem.title }}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li v-if="isMobile" class="relative h-12 flex items-center justify-end pr-7 cursor-pointer text-white bg-[rgba(255,255,255,0.2)] group/logout"
    @click="handleToggleSidebar">
              <div
                class="transform transition-all duration-300"
                :class="toggleSidebar ? '-rotate-180' : ''"
              >
                <span class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    class="w-6 h-6"
                  >
                    <path
                      d="m8.001 2.666-.94.94 3.72 3.727H2.668v1.333h8.113l-3.72 3.727.94.94 5.334-5.334L8 2.666Z"
                    ></path>
                  </svg>
                </span>
              </div>

              <div class="absolute min-w-[88px] -right-[100px] opacity-0 pointer-events-none group-hover/logout:opacity-100 group-hover/logout:pointer-events-auto transition duration-300 text-xs text-center text-white bg-slate-700 shadow-[0_4px_6px_0_rgba(0,0,0,0.25)] rounded p-2">
                <span>Open/Collapse</span>
                <span class="absolute -left-3 w-0 h-0 border-t-[7px] border-t-transparent border-r-[12px] border-r-slate-700 border-b-[7px] border-b-transparent"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import SidebarMenuNav from './SideBarMenuNav.vue';

const toggleSidebar = ref(true);
const isMobile = ref(false);

const currentPath = ref(window.location.pathname);
const menuItems = ref([
  
]);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile);
});

// Asegura que el sidebar esté siempre abierto en desktop
watchEffect(() => {
  if (!isMobile.value) {
    toggleSidebar.value = true;
  }
});

const handleToggleSidebar = () => {
  if (isMobile.value) {
    toggleSidebar.value = !toggleSidebar.value;
  }
};

const isActive = (route) => {
  return currentPath.value === route;
};

const isAnySubItemActive = (item) => {
  return item.some((subItem) => isActive(subItem.link));
};

window.addEventListener('popstate', () => {
  currentPath.value = window.location.pathname;
});
</script>

