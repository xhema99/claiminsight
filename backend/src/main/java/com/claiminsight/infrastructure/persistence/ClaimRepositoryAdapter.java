package com.claiminsight.infrastructure.persistence;

import com.claiminsight.domain.model.Claim;
import com.claiminsight.domain.model.ClaimStatus;
import com.claiminsight.domain.port.outbound.ClaimRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class ClaimRepositoryAdapter implements ClaimRepository {

    private final SpringDataClaimRepository repo;

    public ClaimRepositoryAdapter(SpringDataClaimRepository repo) { this.repo = repo; }

    @Override
    public Claim save(Claim claim) { return repo.save(claim); }

    @Override
    public Optional<Claim> findById(Long id) { return repo.findById(id); }

    @Override
    public List<Claim> findAll(int page, int size) {
        return repo.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
    }

    @Override
    public List<Claim> findByStatus(ClaimStatus status) {
        return repo.findByStatusOrderByCreatedAtDesc(status.name());
    }

    @Override
    public long count() { return repo.count(); }

    @Override
    public long countByStatus(ClaimStatus status) { return repo.countByStatus(status.name()); }
}
