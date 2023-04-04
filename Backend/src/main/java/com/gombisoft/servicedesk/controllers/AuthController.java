package com.gombisoft.servicedesk.controllers;

import com.gombisoft.servicedesk.models.dtos.AuthenticationResponseDTO;
import com.gombisoft.servicedesk.models.dtos.DBUserDTO;
import com.gombisoft.servicedesk.services.DBUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final DBUserService dbUserService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(@RequestBody DBUserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dbUserService.registerUser(userDTO));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(@RequestBody DBUserDTO userDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(dbUserService.authenticate(userDTO));
    }
}
