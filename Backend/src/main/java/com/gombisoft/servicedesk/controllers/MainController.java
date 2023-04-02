package com.gombisoft.servicedesk.controllers;

import com.gombisoft.servicedesk.models.dtos.AuthenticationResponseDTO;
import com.gombisoft.servicedesk.models.dtos.DbUserDTO;
import com.gombisoft.servicedesk.services.DbUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class MainController {
    private final DbUserService dbUserService;

    @GetMapping("/users")
    public ResponseEntity<Object> getUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(dbUserService.getUsers());
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(@RequestBody DbUserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dbUserService.registerUser(userDTO));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(@RequestBody DbUserDTO userDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(dbUserService.authenticate(userDTO));
    }
}
