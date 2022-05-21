package com.keita.task.controller;

import com.keita.task.model.Project;
import com.keita.task.model.ProjectTask;
import com.keita.task.model.User;
import com.keita.task.service.ProjectService;
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
    private final ProjectService projectService;

    public UserController(UserService userService, ProjectService projectService) {
        this.userService = userService;
        this.projectService = projectService;
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

    @GetMapping(value = {"/custom-data/{email}"}
    )
    public void getUserIDAndName(@PathVariable String email, HttpServletResponse response) {
        userService.customData(email, response);
    }

    @GetMapping(value = {"{userID}/projects"})
    public List<Project> project(@PathVariable Long userID, HttpServletResponse response) {
        return userService.projects(userID, response);
    };

    @GetMapping(value = {"{userID}/task-due-soon"})
    public List<ProjectTask> dueSoon(@PathVariable Long userID, HttpServletResponse response) {
        User user = userService.findUserByUserID(userID, response);
        return projectService.dueSoon(user);
    }

    @GetMapping(
            value = {"/all"}
    )
    public List<User> all() {
        return userService.all();
    }
}
