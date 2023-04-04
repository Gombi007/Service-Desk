package com.gombisoft.servicedesk.services;

import com.gombisoft.servicedesk.config.JwtService;
import com.gombisoft.servicedesk.models.DBUser;
import com.gombisoft.servicedesk.models.Role;
import com.gombisoft.servicedesk.models.dtos.AuthenticationResponseDTO;
import com.gombisoft.servicedesk.models.dtos.DBUserDTO;
import com.gombisoft.servicedesk.repositories.DBUserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Transactional
@Builder
public class DBUserServiceImpl implements DBUserService {
    private final DBUserRepository dbUserRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public List<DBUser> getUsers() {
        return dbUserRepository.findAll();
    }

    @Override
    public AuthenticationResponseDTO registerUser(DBUserDTO userDto) {
        var user = DBUser.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .roles(Stream.of(Role.ROLE_USER).collect(Collectors.toCollection(HashSet::new)))
                .isAccountNonExpired(true)
                .isAccountNonLocked(true)
                .isCredentialsNonExpired(true)
                .isEnabled(true)
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
    public AuthenticationResponseDTO authenticate(DBUserDTO userDTO) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));
        var user = dbUserRepository.findUserByUsername(userDTO.getUsername()).orElseThrow(() -> new Exception("hello"));
        var jwtToken = jwtService.generateToken(user);


        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    //converters
    private DBUser convertToDbUser(DBUserDTO userDTO) {
        return modelMapper.map(userDTO, DBUser.class);
    }
}
