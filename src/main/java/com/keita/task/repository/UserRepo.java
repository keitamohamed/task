package com.keita.task.repository;

import com.keita.task.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepo extends CrudRepository<User, Long> {

    @Query(value = "SELECT * FROM User as u", nativeQuery = true)
    List<User> findAllUser();
}
