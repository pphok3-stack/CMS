package com.example.contactmanagement.repository;

import com.example.contactmanagement.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByNameContainingIgnoreCase(String name);
    List<Contact> findByGroup(String group);
    List<Contact> findByFavorite(boolean favorite);
}
