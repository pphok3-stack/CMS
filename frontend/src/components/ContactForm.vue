<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Contact } from '@/types/contact';
import { X } from 'lucide-vue-next';

interface Props {
  contact?: Contact | null;
}

const props = withDefaults(defineProps<Props>(), {
  contact: null
});

const emit = defineEmits<{
  close: [];
  submit: [contact: Contact];
}>();

const formData = reactive<Contact>({
  name: '',
  phone: '',
  email: '',
  address: '',
  group: '',
  notes: '',
  favorite: false,
});

if (props.contact) {
  Object.assign(formData, props.contact);
}

const handleSubmit = () => {
  emit('submit', { ...formData });
};
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="emit('close')">
    <div class="bg-card rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-2xl font-bold text-card-foreground">
          {{ contact ? 'Edit Contact' : 'Add New Contact' }}
        </h2>
        <button @click="emit('close')" class="text-muted-foreground hover:text-foreground">
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-card-foreground mb-2">Name *</label>
          <input
            v-model="formData.name"
            type="text"
            required
            placeholder="John Doe"
            class="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-card-foreground mb-2">Phone *</label>
          <input
            v-model="formData.phone"
            type="tel"
            required
            placeholder="123-456-7890"
            class="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-card-foreground mb-2">Email</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="john@example.com"
            class="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <!-- Address -->
        <div>
          <label class="block text-sm font-medium text-card-foreground mb-2">Address</label>
          <input
            v-model="formData.address"
            type="text"
            placeholder="123 Main St"
            class="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <!-- Group -->
        <div>
          <label class="block text-sm font-medium text-card-foreground mb-2">Group *</label>
          <select
            v-model="formData.group"
            required
            class="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Group</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Work">Work</option>
          </select>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-card-foreground mb-2">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            placeholder="Additional notes..."
            class="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          ></textarea>
        </div>

        <!-- Favorite -->
        <div class="flex items-center gap-2">
          <input
            v-model="formData.favorite"
            type="checkbox"
            id="favorite"
            class="w-4 h-4 rounded border-input focus:ring-2 focus:ring-ring"
          />
          <label for="favorite" class="text-sm font-medium text-card-foreground">Mark as favorite</label>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 pt-4">
          <button
            type="submit"
            class="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            {{ contact ? 'Update' : 'Create' }}
          </button>
          <button
            type="button"
            @click="emit('close')"
            class="flex-1 bg-secondary text-secondary-foreground py-2 rounded-lg hover:bg-secondary/80 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
