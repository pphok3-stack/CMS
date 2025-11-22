<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContactStore } from '@/stores/contactStore';
import { useToast } from 'vue-toastification';
import { Plus, Search } from 'lucide-vue-next';
import ContactCard from '@/components/ContactCard.vue';
import ContactForm from '@/components/ContactForm.vue';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';
import type { Contact } from '@/types/contact';

const contactStore = useContactStore();
const toast = useToast();

const showForm = ref(false);
const showDeleteDialog = ref(false);
const editingContact = ref<Contact | null>(null);
const deletingContactId = ref<number | null>(null);
const searchQuery = ref('');
const selectedGroup = ref('');

onMounted(() => {
  contactStore.fetchContacts();
});

const openAddForm = () => {
  editingContact.value = null;
  showForm.value = true;
};

const openEditForm = (contact: Contact) => {
  editingContact.value = contact;
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  editingContact.value = null;
};

const handleSubmit = async (formData: Contact) => {
  try {
    if (editingContact.value && editingContact.value.id) {
      await contactStore.updateContact(editingContact.value.id, formData);
      toast.success('✅ Contact updated successfully!');
    } else {
      await contactStore.addContact(formData);
      toast.success('✅ Contact added successfully!');
    }
    closeForm();
  } catch (error) {
    toast.error('❌ Error saving contact');
    console.error('Error saving contact:', error);
  }
};

const openDeleteDialog = (id: number) => {
  deletingContactId.value = id;
  showDeleteDialog.value = true;
};

const handleDeleteConfirm = async () => {
  if (deletingContactId.value) {
    try {
      await contactStore.deleteContact(deletingContactId.value);
      toast.success('✅ Contact deleted successfully!');
      showDeleteDialog.value = false;
      deletingContactId.value = null;
    } catch (error) {
      toast.error('❌ Error deleting contact');
      console.error('Error deleting contact:', error);
    }
  }
};

const handleDeleteCancel = () => {
  showDeleteDialog.value = false;
  deletingContactId.value = null;
};

const handleSearch = () => {
  contactStore.searchContacts(searchQuery.value);
};

const handleFilter = () => {
  contactStore.filterByGroup(selectedGroup.value);
};
</script>

<template>
  <div class="p-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-foreground">Contacts</h1>
        <p class="text-muted-foreground">Manage your contacts</p>
      </div>
      <button
        @click="openAddForm"
        class="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        <Plus class="w-5 h-5" />
        Add Contact
      </button>
    </div>

    <!-- Filters -->
    <div class="mb-6 flex gap-4 flex-wrap">
      <div class="flex-1 min-w-[200px] relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search contacts..."
          class="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <select
        v-model="selectedGroup"
        @change="handleFilter"
        class="px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">All Groups</option>
        <option value="Family">Family</option>
        <option value="Friends">Friends</option>
        <option value="Work">Work</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="contactStore.loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="text-muted-foreground mt-4">Loading contacts...</p>
    </div>

    <!-- Error -->
    <div v-else-if="contactStore.error" class="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
      {{ contactStore.error }}
    </div>

    <!-- Contacts Grid -->
    <div v-else-if="contactStore.contacts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ContactCard
        v-for="contact in contactStore.contacts"
        :key="contact.id"
        :contact="contact"
        @edit="openEditForm"
        @delete="openDeleteDialog"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">📭</div>
      <p class="text-muted-foreground text-lg mb-4">No contacts found</p>
      <button
        @click="openAddForm"
        class="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Add Your First Contact
      </button>
    </div>

    <!-- Contact Form Modal -->
    <ContactForm
      v-if="showForm"
      :contact="editingContact"
      @close="closeForm"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-if="showDeleteDialog"
      title="Delete Contact"
      message="Are you sure you want to delete this contact? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      type="danger"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </div>
</template>
