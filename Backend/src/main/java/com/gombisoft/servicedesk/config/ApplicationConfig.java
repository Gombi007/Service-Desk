package com.gombisoft.servicedesk.config;

import com.gombisoft.servicedesk.repositories.DbUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final DbUserRepository dbUserRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> dbUserRepository.findUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
