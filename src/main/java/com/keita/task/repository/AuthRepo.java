package com.keita.task.repository;

import com.keita.task.model.Authenticate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AuthRepo extends CrudRepository<Authenticate, Long> {

    Authenticate findByEmail(@Param("email") String email);
}