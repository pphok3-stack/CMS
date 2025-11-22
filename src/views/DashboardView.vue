<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useContactStore } from '@/stores/contactStore';
import { Users, Heart, FolderOpen, TrendingUp } from 'lucide-vue-next';

const contactStore = useContactStore();

onMounted(() => {
  contactStore.fetchContacts();
});

const stats = computed(() => [
  {
    title: 'Total Contacts',
    value: contactStore.contactsCount,
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    title: 'Favorites',
    value: contactStore.favoriteContacts.length,
    icon: Heart,
    color: 'text-red-500',
    bg: 'bg-red-100 dark:bg-red-900',
  },
  {
    title: 'Groups',
    value: new Set(contactStore.contacts.map(c => c.group)).size,
    icon: FolderOpen,
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900',
  },
  {
    title: 'This Month',
    value: contactStore.contacts.length,
    icon: TrendingUp,
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-900',
  },
]);
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-foreground">Dashboard</h1>
      <p class="text-muted-foreground">Welcome to your contact management system</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center justify-between mb-4">
          <div :class="[stat.bg, 'p-3 rounded-lg']">
            <component :is="stat.icon" :class="[stat.color, 'w-6 h-6']" />
          </div>
        </div>
        <h3 class="text-2xl font-bold text-card-foreground">{{ stat.value }}</h3>
        <p class="text-sm text-muted-foreground">{{ stat.title }}</p>
      </div>
    </div>

    <!-- Recent Contacts -->
    <div class="bg-card rounded-lg border p-6">
      <h2 class="text-xl font-semibold mb-4 text-card-foreground">Recent Contacts</h2>
      <div v-if="contactStore.loading" class="text-center py-8">
        <p class="text-muted-foreground">Loading...</p>
      </div>
      <div v-else-if="contactStore.contacts.length === 0" class="text-center py-8">
        <p class="text-muted-foreground">No contacts yet. Add your first contact!</p>
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="contact in contactStore.contacts.slice(0, 5)"
          :key="contact.id"
          class="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent transition-colors"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              {{ contact.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-medium text-card-foreground">{{ contact.name }}</p>
              <p class="text-sm text-muted-foreground">{{ contact.phone }}</p>
            </div>
          </div>
          <span class="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
            {{ contact.group }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
