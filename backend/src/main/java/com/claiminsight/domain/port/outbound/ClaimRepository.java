package com.claiminsight.domain.port.outbound;

import com.claiminsight.domain.model.Claim;
import com.claiminsight.domain.model.ClaimStatus;
import java.util.List;
import java.util.Optional;

public interface ClaimRepository {
    Claim save(Claim claim);
    Optional<Claim> findById(Long id);
    List<Claim> findAll(int page, int size);
    List<Claim> findByStatus(ClaimStatus status);
    long count();
    long countByStatus(ClaimStatus status);
}
