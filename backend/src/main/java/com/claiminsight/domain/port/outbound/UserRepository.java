package com.claiminsight.domain.port.outbound;

import com.claiminsight.domain.model.User;
import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);
    User save(User user);
    boolean existsByEmail(String email);
}
