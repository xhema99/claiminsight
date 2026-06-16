package com.claiminsight.infrastructure.persistence;

import com.claiminsight.domain.model.User;
import com.claiminsight.domain.port.outbound.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

interface SpringDataUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}

@Repository
public class UserRepositoryAdapter implements UserRepository {

    private final SpringDataUserRepository repo;

    public UserRepositoryAdapter(SpringDataUserRepository repo) { this.repo = repo; }

    @Override
    public Optional<User> findByEmail(String email) { return repo.findByEmail(email); }

    @Override
    public User save(User user) { return repo.save(user); }

    @Override
    public boolean existsByEmail(String email) { return repo.existsByEmail(email); }
}
