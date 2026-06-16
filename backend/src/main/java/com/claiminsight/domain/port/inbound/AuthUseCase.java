package com.claiminsight.domain.port.inbound;

public interface AuthUseCase {
    String register(String name, String email, String password);
    String login(String email, String password);
}
