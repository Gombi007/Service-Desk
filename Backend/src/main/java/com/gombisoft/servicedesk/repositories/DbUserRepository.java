package com.gombisoft.servicedesk.repositories;

import com.gombisoft.servicedesk.models.DbUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DbUserRepository extends JpaRepository<DbUser, Long> {
}
