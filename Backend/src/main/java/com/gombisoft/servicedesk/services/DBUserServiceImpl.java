package com.gombisoft.servicedesk.services;

import com.gombisoft.servicedesk.config.JwtService;
import com.gombisoft.servicedesk.models.DbUser;
import com.gombisoft.servicedesk.models.Role;
import com.gombisoft.servicedesk.models.dtos.AuthenticationResponseDTO;
import com.gombisoft.servicedesk.models.dtos.DbUserDTO;
import com.gombisoft.servicedesk.repositories.DbUserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Builder
public class DBUserServiceImpl implements DbUserService {
    private final DbUserRepository dbUserRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public List<DbUser> getUsers()
    {
        return dbUserRepository.findAll();
    }

    @Override
    public AuthenticationResponseDTO registerUser(DbUserDTO userDto) {
        var user = DbUser.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role(Role.USER)
                .build();
        if (user != null && !user.getUsername().equals("") && user.getPassword().length() >= 6) {
            dbUserRepository.save(user);
        }
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public AuthenticationResponseDTO authenticate(DbUserDTO userDTO) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));
        var user = dbUserRepository.findUserByUsername(userDTO.getUsername()).orElseThrow(() -> new Exception("hello"));
        var jwtToken = jwtService.generateToken(user);


        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    //converters
    private DbUser convertToDbUser(DbUserDTO userDTO) {
        return modelMapper.map(userDTO, DbUser.class);
    }
}
