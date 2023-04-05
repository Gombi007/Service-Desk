package com.gombisoft.servicedesk.services;

import com.gombisoft.servicedesk.exceptions.BadRequestException;
import com.gombisoft.servicedesk.exceptions.ResourceAlreadyExistsException;
import com.gombisoft.servicedesk.models.DBUser;
import com.gombisoft.servicedesk.models.Role;
import com.gombisoft.servicedesk.models.dtos.DBUserDTO;
import com.gombisoft.servicedesk.repositories.DBUserRepository;
import com.gombisoft.servicedesk.texts.ErrorMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashSet;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.gombisoft.servicedesk.config.ApplicationConfig.GLOBAL_ACTIVATED_LANGUAGE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class DBUserServiceImplTest {
    @Mock
    DBUserRepository dbUserRepository;

    @InjectMocks
    DBUserServiceImpl dbUserService;

    DBUser dbUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        HashSet<Role> roleSet = Stream.of(Role.ROLE_USER).collect(Collectors.toCollection(HashSet::new));
        dbUser = new DBUser("id", "tesztelek", "password", "email@teszt.com", true, true, true, true, roleSet);
    }

    @Test
    void testRegisterUserUsernameTaken() {
        //existing username
        when(dbUserRepository.findUserByUsername("tesztelek")).thenReturn(Optional.of(dbUser));
        ResourceAlreadyExistsException exception = assertThrows(ResourceAlreadyExistsException.class, () -> dbUserService.registerUser(new DBUserDTO("tesztelek", "email@teszt.com", "password")));
        assertEquals(ErrorMessage.USERNAME_TAKEN.getMessage(GLOBAL_ACTIVATED_LANGUAGE, dbUser.getUsername()), exception.getMessage());
    }

    @Test
    void testRegisterUserWrongUsername() {
        // too short username
        BadRequestException exception = assertThrows(BadRequestException.class, () -> dbUserService.registerUser(new DBUserDTO("admi", "email@teszt.com", "password")));
        assertEquals(ErrorMessage.USERNAME_INVALID.getMessage(GLOBAL_ACTIVATED_LANGUAGE, "admi"), exception.getMessage());
    }

    @Test
    void testRegisterUserWrongPassword() {
        //too short password
        BadRequestException exception = assertThrows(BadRequestException.class, () -> dbUserService.registerUser(new DBUserDTO("admin", "email@teszt.com", "pass")));
        assertEquals(ErrorMessage.PASSWORD_INVALID.getMessage(GLOBAL_ACTIVATED_LANGUAGE), exception.getMessage());
    }

    @Test
    void testRegisterUserWrongPassword2() {
        //contains whitespace
        BadRequestException exception = assertThrows(BadRequestException.class, () -> dbUserService.registerUser(new DBUserDTO("admin", "email@teszt.com", " password")));
        assertEquals(ErrorMessage.PASSWORD_INVALID.getMessage(GLOBAL_ACTIVATED_LANGUAGE), exception.getMessage());
    }
}
