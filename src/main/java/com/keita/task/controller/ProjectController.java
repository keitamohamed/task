package com.keita.task.controller;


import com.keita.task.model.Project;
import com.keita.task.model.ProjectTask;
import com.keita.task.service.ProjectService;
import com.keita.task.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task/project")
@CrossOrigin
public class ProjectController {

    private final ProjectService service;
    private final TaskService taskService;

    public ProjectController(ProjectService service, TaskService taskService) {
        this.service = service;
        this.taskService = taskService;
    }

    @PostMapping(
            value = {"/add"},
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void saveProject(
            @Valid
            @RequestBody Project project,
            BindingResult result,
            HttpServletResponse response) {
        service.save(project, result, response);
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
        service.saveTask(identifier, task, result, response);
    }

    @GetMapping(value = {"/find-by-identifier/{identifier}"})
    public Optional<Project> getProjectByIdentifier(
            @PathVariable("identifier") String projectIdentifier, HttpServletResponse response) {
        return service.findProjectByIdentifier(HttpStatus.BAD_REQUEST, projectIdentifier, response, "");
    }

    @GetMapping("/find-all-project")
    public List<Project> getAllProject(HttpServletResponse response) {
        return service.findAllProject(response);
    }

    @DeleteMapping(value = "/delete-project/{identifier}")
    public void deleteProject(@PathVariable String identifier, HttpServletResponse response) {
        service.deleteProjectByIdentifier(identifier, response);
    }

    @PutMapping(
            value = {"/update"},
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
    public void updateProjectById(@RequestBody ProjectTask task, @PathVariable Long id,
                                  HttpServletResponse response) {
        taskService.updateTask(task, id, response);
    }

}
