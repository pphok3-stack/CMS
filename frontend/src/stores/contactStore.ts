import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { contactService } from '@/services/contactApi';
import type { Contact } from '@/types/contact';

export const useContactStore = defineStore('contact', () => {
  const contacts = ref<Contact[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const contactsCount = computed(() => contacts.value.length);
  
  const favoriteContacts = computed(() => 
    contacts.value.filter(c => c.favorite)
  );

  const fetchContacts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await contactService.getAllContacts();
      contacts.value = response.data;
    } catch (err) {
      error.value = 'Failed to load contacts';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addContact = async (contact: Contact) => {
    loading.value = true;
    try {
      const response = await contactService.createContact(contact);
      contacts.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = 'Failed to add contact';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateContact = async (id: number, contact: Contact) => {
    loading.value = true;
    try {
      const response = await contactService.updateContact(id, contact);
      const index = contacts.value.findIndex(c => c.id === id);
      if (index !== -1) {
        contacts.value[index] = response.data;
      }
      return response.data;
    } catch (err) {
      error.value = 'Failed to update contact';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteContact = async (id: number) => {
    loading.value = true;
    try {
      await contactService.deleteContact(id);
      contacts.value = contacts.value.filter(c => c.id !== id);
    } catch (err) {
      error.value = 'Failed to delete contact';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const searchContacts = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      fetchContacts();
      return;
    }
    loading.value = true;
    try {
      const response = await contactService.searchContacts(searchTerm);
      contacts.value = response.data;
    } catch (err) {
      error.value = 'Search failed';
    } finally {
      loading.value = false;
    }
  };

  const filterByGroup = async (group: string) => {
    if (!group) {
      fetchContacts();
      return;
    }
    loading.value = true;
    try {
      const response = await contactService.getContactsByGroup(group);
      contacts.value = response.data;
    } catch (err) {
      error.value = 'Filter failed';
    } finally {
      loading.value = false;
    }
  };

  return {
    contacts,
    loading,
    error,
    contactsCount,
    favoriteContacts,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact,
    searchContacts,
    filterByGroup,
  };
});
