package com.claiminsight.domain.port.outbound;

import java.math.BigDecimal;

public interface AiRecommendationPort {
    String getRecommendation(String claimType, String description, BigDecimal amount);
}
