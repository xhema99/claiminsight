package com.claiminsight.application.service;

import com.claiminsight.domain.model.Role;
import com.claiminsight.domain.model.User;
import com.claiminsight.domain.port.inbound.AuthUseCase;
import com.claiminsight.domain.port.outbound.UserRepository;
import com.claiminsight.infrastructure.security.JwtProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public String register(String name, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("El email ya est\u00e1 registrado");
        }
        userRepository.save(new User(email, passwordEncoder.encode(password), name, Role.ROLE_CUSTOMER));
        return jwtProvider.generateToken(email, "ROLE_CUSTOMER");
    }

    @Override
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Credenciales inv\u00e1lidas"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Credenciales inv\u00e1lidas");
        }
        return jwtProvider.generateToken(user.getEmail(), user.getRole().name());
    }
}
