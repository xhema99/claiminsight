package com.claiminsight.infrastructure.web.rest;

import com.claiminsight.domain.port.inbound.DashboardUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardUseCase dashboardUseCase;

    public DashboardController(DashboardUseCase dashboardUseCase) { this.dashboardUseCase = dashboardUseCase; }

    @GetMapping
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(dashboardUseCase.getStats());
    }
}
