package com.gombisoft.servicedesk.services;

import com.gombisoft.servicedesk.models.DBUser;
import com.gombisoft.servicedesk.models.dtos.AuthenticationResponseDTO;
import com.gombisoft.servicedesk.models.dtos.DBUserDTO;

import java.util.List;

public interface DBUserService {

    List<DBUser> getUsers();

    AuthenticationResponseDTO registerUser(DBUserDTO user);

    AuthenticationResponseDTO authenticate(DBUserDTO userDTO) throws Exception;
}
