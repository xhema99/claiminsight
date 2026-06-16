package com.claiminsight.infrastructure.web.rest;

import com.claiminsight.domain.model.Claim;
import com.claiminsight.domain.port.inbound.ClaimUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    private final ClaimUseCase claimUseCase;

    public ClaimController(ClaimUseCase claimUseCase) { this.claimUseCase = claimUseCase; }

    @PostMapping
    public ResponseEntity<Claim> create(@RequestBody Map<String, Object> body,
                                        @AuthenticationPrincipal UserDetails user) {
        Long policyId = Long.valueOf(body.get("policyId").toString());
        String type = (String) body.get("type");
        String description = (String) body.get("description");
        BigDecimal amount = new BigDecimal(body.get("amount").toString());
        return ResponseEntity.ok(claimUseCase.createClaim(policyId, type, description, amount, user.getUsername()));
    }

    @GetMapping
    public List<Claim> list(@RequestParam(required = false) String status,
                            @RequestParam(defaultValue = "0") int page,
                            @RequestParam(defaultValue = "10") int size) {
        return claimUseCase.getClaims(status, page, size);
    }

    @GetMapping("/{id}")
    public Claim getById(@PathVariable Long id) {
        return claimUseCase.getClaimById(id);
    }

    @GetMapping("/{id}/recommendation")
    public ResponseEntity<?> recommend(@PathVariable Long id) {
        try {
            String recommendation = claimUseCase.getRecommendation(id);
            return ResponseEntity.ok(Map.of("claimId", id, "recommendation", recommendation));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
