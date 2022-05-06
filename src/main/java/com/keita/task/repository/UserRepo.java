package com.keita.task.repository;

import com.keita.task.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends CrudRepository<User, Long> {


    @Query(value = "SELECT * " +
            "FROM taskie.user " +
            "INNER JOIN taskie.authenticate a on user.user_id = a.userid " +
            "WHERE a.email = :email", nativeQuery = true)
    Optional<User> findUserByAuth_Email(String email);

    @Query(value = "SELECT * FROM User as u", nativeQuery = true)
    List<User> findAllUser();
}
