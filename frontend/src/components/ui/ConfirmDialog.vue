<script setup lang="ts">
import { X, AlertTriangle } from 'lucide-vue-next';

interface Props {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

withDefaults(defineProps<Props>(), {
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  type: 'danger',
});

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="emit('cancel')">
    <div class="bg-card rounded-lg shadow-2xl w-full max-w-md">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <div class="flex items-center gap-3">
          <div 
            :class="[
              'p-2 rounded-full',
              type === 'danger' ? 'bg-destructive/20' : '',
              type === 'warning' ? 'bg-yellow-500/20' : '',
              type === 'info' ? 'bg-blue-500/20' : ''
            ]"
          >
            <AlertTriangle 
              :class="[
                'w-6 h-6',
                type === 'danger' ? 'text-destructive' : '',
                type === 'warning' ? 'text-yellow-500' : '',
                type === 'info' ? 'text-blue-500' : ''
              ]" 
            />
          </div>
          <h2 class="text-xl font-bold text-card-foreground">{{ title }}</h2>
        </div>
        <button @click="emit('cancel')" class="text-muted-foreground hover:text-foreground">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <p class="text-muted-foreground">{{ message }}</p>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 p-6 border-t">
        <button
          @click="emit('cancel')"
          class="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
        >
          {{ cancelText }}
        </button>
        <button
          @click="emit('confirm')"
          :class="[
            'flex-1 px-4 py-2 rounded-lg transition-colors font-medium',
            type === 'danger' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : '',
            type === 'warning' ? 'bg-yellow-500 text-white hover:bg-yellow-600' : '',
            type === 'info' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
          ]"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>
