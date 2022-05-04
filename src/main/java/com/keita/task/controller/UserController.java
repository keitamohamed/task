package com.keita.task.controller;

import com.keita.task.model.User;
import com.keita.task.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/task/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(
            value = {"/register"},
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void saveProject(
            @RequestBody
            @Valid User user,
            BindingResult bindingResult,
            HttpServletResponse response) {
        userService.save(user, bindingResult, response);
    }

    @GetMapping(
            value = {"/all"}
    )
    public List<User> all() {
        return userService.all();
    }
}
