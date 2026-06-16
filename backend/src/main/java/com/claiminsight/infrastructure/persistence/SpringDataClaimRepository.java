package com.claiminsight.infrastructure.persistence;

import com.claiminsight.domain.model.Claim;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpringDataClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByStatusOrderByCreatedAtDesc(String status);
    long countByStatus(String status);
    List<Claim> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
