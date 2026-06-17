package com.claiminsight.infrastructure.persistence;

import com.claiminsight.domain.model.Claim;
import com.claiminsight.domain.model.ClaimStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface SpringDataClaimRepository extends JpaRepository<Claim, Long> {
    @Query("SELECT c FROM Claim c WHERE c.status = :status ORDER BY c.createdAt DESC")
    List<Claim> findByStatus(@org.springframework.data.repository.query.Param("status") ClaimStatus status);

    @Query("SELECT COUNT(c) FROM Claim c WHERE c.status = :status")
    long countByStatus(@org.springframework.data.repository.query.Param("status") ClaimStatus status);

    List<Claim> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
