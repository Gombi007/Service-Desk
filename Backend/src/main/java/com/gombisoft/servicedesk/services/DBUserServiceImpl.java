package com.gombisoft.servicedesk.services;

import com.gombisoft.servicedesk.config.JwtService;
import com.gombisoft.servicedesk.exceptions.BadRequestException;
import com.gombisoft.servicedesk.exceptions.NoSuchElementException;
import com.gombisoft.servicedesk.exceptions.ResourceAlreadyExistsException;
import com.gombisoft.servicedesk.models.DBUser;
import com.gombisoft.servicedesk.models.Role;
import com.gombisoft.servicedesk.models.dtos.AuthenticationResponseDTO;
import com.gombisoft.servicedesk.models.dtos.DBUserDTO;
import com.gombisoft.servicedesk.repositories.DBUserRepository;
import com.gombisoft.servicedesk.texts.ErrorMessage;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.gombisoft.servicedesk.config.ApplicationConfig.GLOBAL_ACTIVATED_LANGUAGE;

@Service
@RequiredArgsConstructor
@Transactional
@Builder
@Slf4j
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

        if (dbUserRepository.findUserByUsername(userDto.getUsername()).isPresent()) {
            throw new ResourceAlreadyExistsException(ErrorMessage.USERNAME_TAKEN.getMessage(GLOBAL_ACTIVATED_LANGUAGE, userDto.getUsername()));
        }

        if (!usernameValidator(userDto.getUsername())) {
            throw new BadRequestException(ErrorMessage.USERNAME_INVALID.getMessage(GLOBAL_ACTIVATED_LANGUAGE, userDto.getUsername()));
        }

        if (!passwordValidator(userDto.getPassword())) {
            throw new BadRequestException(ErrorMessage.PASSWORD_INVALID.getMessage(GLOBAL_ACTIVATED_LANGUAGE));
        }

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
        dbUserRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public AuthenticationResponseDTO authenticate(DBUserDTO userDTO) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));
        } catch (AuthenticationException e) {
            throw new NoSuchElementException(ErrorMessage.WRONG_USERNAME_OR_PASSWORD.getMessage(GLOBAL_ACTIVATED_LANGUAGE));
        }

        var user = dbUserRepository.findUserByUsername(userDTO.getUsername()).orElseThrow(() -> new NoSuchElementException(ErrorMessage.WRONG_USERNAME_OR_PASSWORD.getMessage(GLOBAL_ACTIVATED_LANGUAGE)));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    private boolean usernameValidator(String username) {
        //min 5 characters lowercase, and it contains only numbers and letters and support hungarian chars
        return username.matches("^[\\p{Ll}0-9]{5,}$");
    }

    private boolean passwordValidator(String password) {
        //password must be a minimum 6 characters long word without any whitespace
        return password.matches("^(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()-_=+\\\\|\\\\[{\\\\]};:'\",.<>/?]{6,}$");
    }

    //converters
    private DBUser convertToDbUser(DBUserDTO userDTO) {
        return modelMapper.map(userDTO, DBUser.class);
    }
}
