package com.keita.task.service;

import com.keita.task.error_handler.*;
import com.keita.task.model.Authenticate;
import com.keita.task.model.Project;
import com.keita.task.model.User;
import com.keita.task.repository.AuthRepo;
import com.keita.task.repository.UserRepo;
import com.keita.task.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final AuthRepo authRepo;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder, UserRepo userRepo, AuthRepo authRepo) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
        this.authRepo = authRepo;
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

    public List<Project> projects(Long userID, HttpServletResponse response) {
        User findUser = findUserByUserID(userID, response);
        System.out.println("Size " + findUser.getProject().size());
        findUser.getProject().forEach(p -> System.out.println(p.getIdentifier()));
        return findUser.getProject();
    }

    public void customData(String email, HttpServletResponse response) {
        Authenticate findUser = authRepo.findByEmail(email);
        Map<String, String> data = new HashMap<>();

        User user = findUser.getAuth();
        data.put("userID", user.getUserID().toString());
        data.put("name", user.getFirstName() + " " + user.getLastName());
        new CustomData(response, data);
    }

    @Transactional
    public List<User> all () {
        return userRepo.findAllUser();
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

    public User findUserByUserID(Long userID, HttpServletResponse response) {
        Optional<User> findUser = findUserByID(userID);
        return findUser.orElseThrow(() -> new ProjectExceptionHandler(
                HttpStatus.BAD_REQUEST,
                response,
                String.format("User with identifier %s does not exist", userID)));
    }

    private Optional<User> findUserByID(Long userID) {
        return  userRepo.findById(userID);
    }

    private Optional<User> findUserByEmail(String email) {
        return userRepo.findUserByAuth_Email(email);
    }

    private void checkPasswordValidation(User user, HttpServletResponse response) {
        Authenticate authenticate = user.getAuth();
        if (authenticate.getPassword().length() < 8 || authenticate.getPassword().length() > 10) {
            throw new PasswordValidation(response, "Password must be between 8 to 10 character in length");
        }
    }
}
