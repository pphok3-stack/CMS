<script setup lang="ts">
import type { Contact } from '@/types/contact';
import { Mail, Phone, MapPin, Edit, Trash2, Heart } from 'lucide-vue-next';

interface Props {
  contact: Contact;
}

defineProps<Props>();

const emit = defineEmits<{
  edit: [contact: Contact];
  delete: [id: number];
}>();

const getGroupColor = (group?: string) => {
  const colors: Record<string, string> = {
    'Family': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Friends': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Work': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  };
  return colors[group || ''] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
};
</script>

<template>
  <div class="bg-card border rounded-lg p-6 hover:shadow-lg transition-all">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {{ contact.name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h3 class="font-semibold text-card-foreground flex items-center gap-2">
            {{ contact.name }}
            <Heart v-if="contact.favorite" class="w-4 h-4 fill-red-500 text-red-500" />
          </h3>
          <span :class="['text-xs px-2 py-1 rounded-full', getGroupColor(contact.group)]">
            {{ contact.group || 'No Group' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Contact Info -->
    <div class="space-y-2 mb-4">
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone class="w-4 h-4" />
        <span>{{ contact.phone }}</span>
      </div>
      <div v-if="contact.email" class="flex items-center gap-2 text-sm text-muted-foreground">
        <Mail class="w-4 h-4" />
        <span>{{ contact.email }}</span>
      </div>
      <div v-if="contact.address" class="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin class="w-4 h-4" />
        <span>{{ contact.address }}</span>
      </div>
    </div>

    <!-- Notes -->
    <p v-if="contact.notes" class="text-sm text-muted-foreground mb-4 line-clamp-2">
      {{ contact.notes }}
    </p>

    <!-- Actions -->
    <div class="flex gap-2">
      <button
        @click="emit('edit', contact)"
        class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
      >
        <Edit class="w-4 h-4" />
        Edit
      </button>
      <button
        @click="emit('delete', contact.id!)"
        class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
      >
        <Trash2 class="w-4 h-4" />
        Delete
      </button>
    </div>
  </div>
</template>
