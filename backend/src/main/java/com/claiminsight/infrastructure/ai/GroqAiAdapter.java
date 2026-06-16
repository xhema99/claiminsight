package com.claiminsight.infrastructure.ai;

import com.claiminsight.domain.port.outbound.AiRecommendationPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Component
public class GroqAiAdapter implements AiRecommendationPort {

    private final RestTemplate rest;
    private final String apiKey;
    private final String model;

    public GroqAiAdapter(@Value("${groq.api-key}") String apiKey,
                         @Value("${groq.model}") String model) {
        this.apiKey = apiKey;
        this.model = model;
        this.rest = new RestTemplate();
    }

    @Override
    public String getRecommendation(String claimType, String description, BigDecimal amount) {
        try {
            String prompt = """
                Eres un ajustador de seguros senior. Analiza este reclamo y responde SOLO JSON:
                {"priority":"ALTA|MEDIA|BAJA","adjuster":"especialidad","days":N,"actions":["x"],"reasoning":"y"}
                Tipo: %s | Descripcion: %s | Monto: $%.2f
                """.formatted(claimType, description, amount);

            var headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            var body = Map.of(
                "model", model, "temperature", 0.3, "max_tokens", 500,
                "messages", List.of(Map.of("role", "user", "content", prompt))
            );

            var response = rest.postForEntity(
                "https://api.groq.com/openai/v1/chat/completions",
                new HttpEntity<>(body, headers), Map.class);

            if (response.getBody() != null) {
                var choices = (List<Map>) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    var message = (Map) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }
        } catch (Exception ignored) {}

        // Fallback: reglas de negocio si Groq no responde
        String priority = amount.compareTo(new BigDecimal("10000")) > 0 ? "ALTA" :
                         amount.compareTo(new BigDecimal("5000")) > 0 ? "MEDIA" : "BAJA";
        int days = priority.equals("ALTA") ? 5 : priority.equals("MEDIA") ? 10 : 20;
        return "{\"priority\":\"%s\",\"adjuster\":\"Ajustador %s\",\"days\":%d,\"actions\":[\"Revisar documentacion\",\"Contactar asegurado\"],\"reasoning\":\"Recomendacion automatica\"}"
                .formatted(priority, claimType.toLowerCase(), days);
    }
}
