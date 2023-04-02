package com.gombisoft.servicedesk.repositories;

import com.gombisoft.servicedesk.models.DbUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DbUserRepository extends MongoRepository<DbUser, String> {
    @Query("{username:'?0'}")
    Optional<DbUser> findUserByUsername(String username);
}
