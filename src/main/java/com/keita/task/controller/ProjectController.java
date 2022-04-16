package com.keita.task.controller;


import com.keita.task.model.Project;
import com.keita.task.service.ProjectService;
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

    public ProjectController(ProjectService service) {
        this.service = service;
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
            value = {"/update-project"},
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void updateProjectByIdentifier(
            @RequestBody Project project,
            HttpServletResponse response) {
        service.updateProject(project, response);
    }

}
