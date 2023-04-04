package com.gombisoft.servicedesk.repositories;

import com.gombisoft.servicedesk.models.DBUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DBUserRepository extends MongoRepository<DBUser, String> {
    @Query("{username:'?0'}")
    Optional<DBUser> findUserByUsername(String username);
}
