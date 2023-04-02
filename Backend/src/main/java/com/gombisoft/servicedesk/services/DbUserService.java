package com.gombisoft.servicedesk.services;

import com.gombisoft.servicedesk.models.DbUser;
import com.gombisoft.servicedesk.models.dtos.AuthenticationResponseDTO;
import com.gombisoft.servicedesk.models.dtos.DbUserDTO;

import java.util.List;

public interface DbUserService {

    List<DbUser> getUsers();

    AuthenticationResponseDTO registerUser(DbUserDTO user);

    AuthenticationResponseDTO authenticate(DbUserDTO userDTO) throws Exception;
}
