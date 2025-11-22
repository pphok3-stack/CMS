package com.example.contactmanagement.service;

import com.example.contactmanagement.model.Contact;
import com.example.contactmanagement.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;
    
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }
    
    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }
    
    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }
    
    public Contact updateContact(Long id, Contact contactDetails) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        contact.setName(contactDetails.getName());
        contact.setPhone(contactDetails.getPhone());
        contact.setEmail(contactDetails.getEmail());
        contact.setAddress(contactDetails.getAddress());
        contact.setGroup(contactDetails.getGroup());
        contact.setNotes(contactDetails.getNotes());
        contact.setFavorite(contactDetails.isFavorite());
        return contactRepository.save(contact);
    }
    
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
    
    public List<Contact> searchContacts(String name) {
        return contactRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Contact> getContactsByGroup(String group) {
        return contactRepository.findByGroup(group);
    }
    
    public List<Contact> getFavoriteContacts() {
        return contactRepository.findByFavorite(true);
    }
}
