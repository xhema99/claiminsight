package com.claiminsight.application.service;

import com.claiminsight.domain.model.ClaimStatus;
import com.claiminsight.domain.port.inbound.DashboardUseCase;
import com.claiminsight.domain.port.outbound.ClaimRepository;
import org.springframework.stereotype.Service;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class DashboardServiceImpl implements DashboardUseCase {

    private final ClaimRepository claimRepository;

    public DashboardServiceImpl(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    @Override
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new LinkedHashMap<>();
        stats.put("total", claimRepository.count());
        stats.put("open", claimRepository.countByStatus(ClaimStatus.OPEN));
        stats.put("inProgress", claimRepository.countByStatus(ClaimStatus.IN_PROGRESS));
        stats.put("resolved", claimRepository.countByStatus(ClaimStatus.RESOLVED));
        stats.put("rejected", claimRepository.countByStatus(ClaimStatus.REJECTED));
        return stats;
    }
}
