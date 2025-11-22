<script setup lang="ts">
import Sidebar from './Sidebar.vue';
</script>

<template>
  <div class="flex min-h-screen bg-background">
    <Sidebar />
    <main class="flex-1 lg:ml-64 pt-16 lg:pt-0">
      <router-view />
    </main>
  </div>
</template>
