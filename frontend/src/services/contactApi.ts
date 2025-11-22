import axios, { type AxiosResponse } from 'axios';
import type { Contact } from '@/types/contact';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactService = {
  getAllContacts(): Promise<AxiosResponse<Contact[]>> {
    return apiClient.get<Contact[]>('/contacts');
  },

  getContactById(id: number): Promise<AxiosResponse<Contact>> {
    return apiClient.get<Contact>(`/contacts/${id}`);
  },

  createContact(contact: Contact): Promise<AxiosResponse<Contact>> {
    return apiClient.post<Contact>('/contacts', contact);
  },

  updateContact(id: number, contact: Contact): Promise<AxiosResponse<Contact>> {
    return apiClient.put<Contact>(`/contacts/${id}`, contact);
  },

  deleteContact(id: number): Promise<AxiosResponse<void>> {
    return apiClient.delete<void>(`/contacts/${id}`);
  },

  searchContacts(name: string): Promise<AxiosResponse<Contact[]>> {
    return apiClient.get<Contact[]>('/contacts/search', {
      params: { name }
    });
  },

  getContactsByGroup(group: string): Promise<AxiosResponse<Contact[]>> {
    return apiClient.get<Contact[]>(`/contacts/group/${group}`);
  },

  getFavoriteContacts(): Promise<AxiosResponse<Contact[]>> {
    return apiClient.get<Contact[]>('/contacts/favorites');
  },
};

export default contactService;
