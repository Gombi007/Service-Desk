package com.gombisoft.servicedesk.services;

import com.gombisoft.servicedesk.models.DbUser;
import com.gombisoft.servicedesk.models.dtos.DbUserDTO;
import com.gombisoft.servicedesk.repositories.DbUserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DBUserServiceImpl implements DbUserService {
    private final DbUserRepository dbUserRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<DbUser> getUsers() {
        return dbUserRepository.findAll();
    }

    @Override
    public void registerUser(DbUserDTO user) {
        if (user != null && !user.getUsername().equals("") && user.getPassword().length() >= 6) {
            dbUserRepository.save(convertToDbUser(user));
        }
    }

    //converters
    private DbUser convertToDbUser(DbUserDTO userDTO) {
        return modelMapper.map(userDTO, DbUser.class);
    }
}
