<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDarkMode } from '@/composables/useDarkMode';
import { LayoutDashboard, Users, Moon, Sun, Menu, X } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const { isDark, toggleDark } = useDarkMode();
const isMobileMenuOpen = ref(false);

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Contacts', path: '/contacts', icon: Users },
];

const navigateTo = (path: string) => {
  router.push(path);
  isMobileMenuOpen.value = false;
};

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div>
    <!-- Mobile Menu Button -->
    <button
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border"
    >
      <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
      <X v-else class="w-6 h-6" />
    </button>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-screen bg-card border-r transition-transform duration-300 z-40',
        'w-64 lg:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo -->
      <div class="p-6 border-b">
        <h1 class="text-2xl font-bold text-primary">Contact App</h1>
        <p class="text-sm text-muted-foreground">Management System</p>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <button
          v-for="item in menuItems"
          :key="item.path"
          @click="navigateTo(item.path)"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
            isActive(item.path)
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="font-medium">{{ item.name }}</span>
        </button>
      </nav>

      <!-- Dark Mode Toggle -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
        <button
          @click="toggleDark"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Moon v-if="!isDark" class="w-5 h-5" />
          <Sun v-else class="w-5 h-5" />
          <span class="font-medium">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="isMobileMenuOpen"
      @click="isMobileMenuOpen = false"
      class="lg:hidden fixed inset-0 bg-black/50 z-30"
    ></div>
  </div>
</template>
