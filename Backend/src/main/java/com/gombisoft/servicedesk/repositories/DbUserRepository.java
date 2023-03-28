package com.gombisoft.servicedesk.repositories;

import com.gombisoft.servicedesk.models.DbUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DbUserRepository extends MongoRepository<DbUser, Long> {
}
