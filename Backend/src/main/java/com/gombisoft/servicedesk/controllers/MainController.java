package com.gombisoft.servicedesk.controllers;

import com.gombisoft.servicedesk.services.DBUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class MainController {
    private final DBUserService dbUserService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping()
    public ResponseEntity<Object> getUsers() {

        return ResponseEntity.status(HttpStatus.OK).body(dbUserService.getUsers());
    }
}
