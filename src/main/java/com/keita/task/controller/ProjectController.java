package com.keita.task.controller;


import com.keita.task.model.Project;
import com.keita.task.model.ProjectTask;
import com.keita.task.model.User;
import com.keita.task.service.ProjectService;
import com.keita.task.service.TaskService;
import com.keita.task.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/task/project")
public class ProjectController {

    private final ProjectService service;
    private final TaskService taskService;
    private final UserService userService;

    public ProjectController(ProjectService service, TaskService taskService, UserService userService) {
        this.service = service;
        this.taskService = taskService;
        this.userService = userService;
    }

    @PostMapping(
            value = {"/{userID}/add"},
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void saveProject(
            @PathVariable("userID") Long userID,
            @Valid
            @RequestBody Project project,
            BindingResult result,
            HttpServletResponse response) {
        User user = userService.findUserByUserID(userID, response);
        service.save(user, project, result, response);
    }

    @PostMapping(
            value = {"{identifier}/add-task"},
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addTask(
            @PathVariable String identifier,
            @Valid
            @RequestBody ProjectTask task,
            BindingResult result,
            HttpServletResponse response) {
        Optional<Project> findProject = service.findProjectByIdentifier(HttpStatus.BAD_REQUEST, identifier, response, "");
        Project project = findProject.get();
        taskService.save(project, task, result, response);
    }

    @GetMapping(value = {"/find-by-identifier/{identifier}"})
    public Optional<Project> getProjectByIdentifier(
            @PathVariable("identifier") String projectIdentifier, HttpServletResponse response) {
        return service.findProjectByIdentifier(HttpStatus.BAD_REQUEST, projectIdentifier, response, "");
    }

    @GetMapping(value = {"/find-task-by-id/{id}"})
    public Optional<ProjectTask> getProjectByIdentifier(
            @PathVariable("id") Long id, HttpServletResponse response) {
        return taskService.findTaskByID(id, response);
    }

    @GetMapping("/find-all-project")
    public List<Project> getAllProject(HttpServletResponse response) {
        return service.findAllProject(response);
    }

    @GetMapping("/find-all-project-task")
    public List<ProjectTask> getAllTask(HttpServletResponse response) {
        return taskService.projectTaskList(response);
    }

    @GetMapping("/project-task/{identifier}")
    public List<ProjectTask> projectTaskSort(@PathVariable("identifier") String identifier, HttpServletResponse response) {
        return service.findProjectTaskSortByDueDateAndPriority(identifier, response);
    }

    @GetMapping("/task-by-priority")
    public List<ProjectTask> tasksByPriority(HttpServletResponse response) {
        return taskService.sortTaskByPriority(response);
    }

    @GetMapping(value = "/task-due-soon")
    public List<ProjectTask> tasksDueSoon(HttpServletResponse response) {
        return taskService.taskDueSoon(response);
    }

    @DeleteMapping(value = "/delete/{identifier}")
    public void deleteProject(@PathVariable String identifier, HttpServletResponse response) {
        service.deleteProjectByIdentifier(identifier, response);
    }

    @DeleteMapping(value = "/delete-task/{id}")
    public void deleteProjectTask(@PathVariable Long id, HttpServletResponse response) {
        taskService.deleteTask(id, response);
    }

    @PutMapping(
            value = {"/update/{id}"},
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void updateProjectByIdentifier(
            @RequestBody Project project,
            HttpServletResponse response) {
        service.updateProject(project, response);
    }
    @PutMapping(
            value = {"/update-task/{id}"},
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void updateProjectTaskById(@RequestBody ProjectTask task, @PathVariable Long id,
                                  HttpServletResponse response) {
        taskService.updateTask(task, id, response);
    }

}
