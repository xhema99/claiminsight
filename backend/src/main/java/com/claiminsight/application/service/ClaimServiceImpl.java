package com.claiminsight.application.service;

import com.claiminsight.domain.model.Claim;
import com.claiminsight.domain.model.ClaimStatus;
import com.claiminsight.domain.model.User;
import com.claiminsight.domain.port.inbound.ClaimUseCase;
import com.claiminsight.domain.port.outbound.*;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ClaimServiceImpl implements ClaimUseCase {

    private final ClaimRepository claimRepository;
    private final PolicyRepository policyRepository;
    private final UserRepository userRepository;
    private final AiRecommendationPort aiRecommendationPort;

    public ClaimServiceImpl(ClaimRepository claimRepository, PolicyRepository policyRepository,
                            UserRepository userRepository, AiRecommendationPort aiRecommendationPort) {
        this.claimRepository = claimRepository;
        this.policyRepository = policyRepository;
        this.userRepository = userRepository;
        this.aiRecommendationPort = aiRecommendationPort;
    }

    @Override
    public Claim createClaim(Long policyId, String type, String description, BigDecimal amount, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        var policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new IllegalArgumentException("P\u00f3liza no encontrada"));

        String claimNumber = "CLM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        return claimRepository.save(new Claim(claimNumber, policyId, policy.getCustomerId(), type, description, amount));
    }

    @Override
    public List<Claim> getClaims(String status, int page, int size) {
        if (status != null && !status.isBlank()) {
            return claimRepository.findByStatus(ClaimStatus.valueOf(status.toUpperCase()));
        }
        return claimRepository.findAll(page, size);
    }

    @Override
    public Claim getClaimById(Long id) {
        return claimRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reclamo no encontrado"));
    }

    @Override
    public String getRecommendation(Long claimId) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new IllegalArgumentException("Reclamo no encontrado"));
        return aiRecommendationPort.getRecommendation(claim.getType(), claim.getDescription(), claim.getAmount());
    }
}
