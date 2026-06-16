package com.claiminsight.domain.port.inbound;

import com.claiminsight.domain.model.Claim;
import java.util.List;

public interface ClaimUseCase {
    Claim createClaim(Long policyId, String type, String description, java.math.BigDecimal amount, String userEmail);
    List<Claim> getClaims(String status, int page, int size);
    Claim getClaimById(Long id);
    String getRecommendation(Long claimId);
}
