package com.claiminsight.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;

    public Customer() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
