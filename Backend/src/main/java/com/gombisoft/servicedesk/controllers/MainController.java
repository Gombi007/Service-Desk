package com.gombisoft.servicedesk.controllers;

import com.gombisoft.servicedesk.models.dtos.DbUserDTO;
import com.gombisoft.servicedesk.services.DbUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class MainController {
    private final DbUserService dbUserService;

    @GetMapping()
    public ResponseEntity<Object> getUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(dbUserService.getUsers());
    }

    @PostMapping()
    public ResponseEntity<Object> registerUser(@RequestBody DbUserDTO userDTO) {
        dbUserService.registerUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
