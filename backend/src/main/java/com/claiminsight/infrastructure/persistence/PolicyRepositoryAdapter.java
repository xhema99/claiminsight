package com.claiminsight.infrastructure.persistence;

import com.claiminsight.domain.model.Policy;
import com.claiminsight.domain.port.outbound.PolicyRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

interface SpringDataPolicyRepository extends JpaRepository<Policy, Long> {}

@Repository
public class PolicyRepositoryAdapter implements PolicyRepository {

    private final SpringDataPolicyRepository repo;

    public PolicyRepositoryAdapter(SpringDataPolicyRepository repo) { this.repo = repo; }

    @Override
    public Optional<Policy> findById(Long id) { return repo.findById(id); }
}
