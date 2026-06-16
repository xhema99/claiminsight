package com.claiminsight.infrastructure.web.rest;

import com.claiminsight.domain.port.inbound.AuthUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthUseCase authUseCase;

    public AuthController(AuthUseCase authUseCase) { this.authUseCase = authUseCase; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            String token = authUseCase.register(body.get("name"), body.get("email"), body.get("password"));
            return ResponseEntity.ok(Map.of("token", token, "email", body.get("email"), "name", body.get("name")));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String token = authUseCase.login(body.get("email"), body.get("password"));
            return ResponseEntity.ok(Map.of("token", token, "email", body.get("email")));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciales inv\u00e1lidas"));
        }
    }
}
