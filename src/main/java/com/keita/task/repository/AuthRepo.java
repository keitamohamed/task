package com.keita.task.repository;

import com.keita.task.model.Authenticate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepo extends CrudRepository<Authenticate, Long> {
    Authenticate findByEmail(String email);
}
