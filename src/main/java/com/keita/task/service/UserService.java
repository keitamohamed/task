package com.keita.task.service;

import com.keita.task.error_handler.InvalidInput;
import com.keita.task.error_handler.PasswordValidation;
import com.keita.task.error_handler.SuccessfulHandler;
import com.keita.task.model.Authenticate;
import com.keita.task.model.User;
import com.keita.task.repository.UserRepo;
import com.keita.task.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder, UserRepo userRepo) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
    }

    public void save(User user, BindingResult result, HttpServletResponse response) {
        Long generateNewUserID = Util.generateID(9999999);
        if (result.hasErrors()) {
            throw new InvalidInput(result, response, "Invalid input fields. Make sure all required fields are valid");
        }

        checkPasswordValidation(user, response);
        Optional<User> findUser = findUserByID(generateNewUserID);
        while (findUser.isPresent()) {
            generateNewUserID = Util.generateID(9999999);
            findUser = findUserByID(generateNewUserID);
        }
        user.setUserID(generateNewUserID);
        setAuthenticate(user);
        Authenticate authenticate = user.getAuth();
        authenticate.setPassword(passwordEncoder.encode(authenticate.getPassword()));
        userRepo.save(user);
        String message = String.format("Your account have been created. Your user ID is [ %s ]. You can now login", user.getUserID());
        new SuccessfulHandler(response, message);
    }

    public List<User> all () {
        return userRepo.findAll();
    }

    private void setAuthenticate(User user) {
        Authenticate authenticate = user.getAuth();
        authenticate.setAuth(user);
        authenticate.setAuthID(Util.generateID(9999999));
        authenticate.setRole("User");
        authenticate.setAccountNonExpired(true);
        authenticate.setAccountNotLocked(true);
        authenticate.setCredentialsNonExpired(true);
        authenticate.setEnabled(true);
    }

    private Optional<User> findUserByID(Long userID) {
        return  userRepo.findById(userID);
    }

    private void checkPasswordValidation(User user, HttpServletResponse response) {
        Authenticate authenticate = user.getAuth();
        if (authenticate.getPassword().length() < 8 || authenticate.getPassword().length() > 10) {
            throw new PasswordValidation(response, "Password must be between 8 to 10 character in length");
        }
    }
}
