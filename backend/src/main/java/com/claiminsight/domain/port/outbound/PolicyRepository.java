package com.claiminsight.domain.port.outbound;

import com.claiminsight.domain.model.Policy;
import java.util.Optional;

public interface PolicyRepository {
    Optional<Policy> findById(Long id);
}
