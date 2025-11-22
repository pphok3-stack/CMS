package com.example.contactmanagement.controller;

import com.example.contactmanagement.model.Contact;
import com.example.contactmanagement.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ContactController {
    @Autowired
    private ContactService contactService;
    
    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        return contactService.getContactById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Contact> createContact(@Valid @RequestBody Contact contact) {
        Contact savedContact = contactService.createContact(contact);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @Valid @RequestBody Contact contactDetails) {
        try {
            Contact updatedContact = contactService.updateContact(id, contactDetails);
            return ResponseEntity.ok(updatedContact);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public List<Contact> searchContacts(@RequestParam String name) {
        return contactService.searchContacts(name);
    }
    
    @GetMapping("/group/{group}")
    public List<Contact> getContactsByGroup(@PathVariable String group) {
        return contactService.getContactsByGroup(group);
    }
    
    @GetMapping("/favorites")
    public List<Contact> getFavoriteContacts() {
        return contactService.getFavoriteContacts();
    }
}
