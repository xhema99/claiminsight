package com.claiminsight.domain.port.inbound;

import java.util.Map;

public interface DashboardUseCase {
    Map<String, Long> getStats();
}
