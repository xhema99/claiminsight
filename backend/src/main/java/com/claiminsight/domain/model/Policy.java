package com.claiminsight.domain.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "policies")
public class Policy {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String policyNumber;
    private String type;
    private Long customerId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private BigDecimal premium;

    public Policy() {}

    public Long getId() { return id; }
    public Long getCustomerId() { return customerId; }
    public String getType() { return type; }
    public String getPolicyNumber() { return policyNumber; }
}
