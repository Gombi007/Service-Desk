package com.gombisoft.servicedesk.repositories;

import com.gombisoft.servicedesk.models.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends MongoRepository<Session, String> {
    Optional<Session> findByToken(String token);
}
