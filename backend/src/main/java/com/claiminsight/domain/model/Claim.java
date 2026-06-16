package com.claiminsight.domain.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "claims")
public class Claim {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String claimNumber;
    private Long policyId;
    private Long customerId;
    private Long adjusterId;
    private String type;
    @Column(columnDefinition = "TEXT")
    private String description;
    private BigDecimal amount;
    @Enumerated(EnumType.STRING)
    private ClaimStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Claim() {}

    public Claim(String claimNumber, Long policyId, Long customerId, String type, String description, BigDecimal amount) {
        this.claimNumber = claimNumber;
        this.policyId = policyId;
        this.customerId = customerId;
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.status = ClaimStatus.OPEN;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getClaimNumber() { return claimNumber; }
    public Long getPolicyId() { return policyId; }
    public Long getCustomerId() { return customerId; }
    public Long getAdjusterId() { return adjusterId; }
    public String getType() { return type; }
    public String getDescription() { return description; }
    public BigDecimal getAmount() { return amount; }
    public ClaimStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
