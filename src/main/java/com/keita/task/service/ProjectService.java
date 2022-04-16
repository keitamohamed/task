package com.keita.task.service;

import com.keita.task.error_handler.InvalidInput;
import com.keita.task.error_handler.ProjectExceptionHandler;
import com.keita.task.model.Project;
import com.keita.task.repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProjectService {

    private final ProjectRepo projectRepo;

    @Autowired
    public ProjectService(ProjectRepo projectRepo) {
        this.projectRepo = projectRepo;
    }

    public void save(Project project, BindingResult result, HttpServletResponse response) {
        if (result.hasErrors()) {
            throw new InvalidInput(result, response, "Invalid fields");
        }
        findByIdentifier(project.getIdentifier(), response);

        project.setIdentifier(project.getIdentifier().toUpperCase());
        projectRepo.save(project);
    }

    public List<Project> findAllProject(HttpServletResponse response) {
        return StreamSupport.stream(
                        Spliterators.spliteratorUnknownSize(projectRepo.findAll().iterator(),
                                Spliterator.ORDERED),
                        false)
                .collect(Collectors.collectingAndThen(Collectors.toList(), result -> {
                    if (result.isEmpty()) {
                        throw new ProjectExceptionHandler(
                                HttpStatus.NO_CONTENT,
                                response,
                                "No content to load."
                        );}
                    return result;
                }));
    }

    public void deleteProjectByIdentifier(String identifier, HttpServletResponse response) {
        String message = String.format("Project with identifier %s does not exists", identifier);
        Optional<Project> findProject = findProjectByIdentifier(HttpStatus.NO_CONTENT, identifier, response, message);
        findProject.ifPresent(projectRepo::delete);
        throw new ProjectExceptionHandler(HttpStatus.OK, response, String.format("Project with identifier %s was deleted", identifier));

    }

    public void updateProject(Project project, HttpServletResponse response) {
        String message = String.format("Project with identifier %s does not exists", project.getIdentifier());
        Optional<Project> findProject = findProjectByIdentifier(HttpStatus.NO_CONTENT, project.getIdentifier(), response, message);

        findProject.ifPresent(result -> {
            result.setDescription(project.getDescription());
            result.setName(project.getName());
            result.setStartDate(project.getStartDate());
            result.setEndDate(project.getEndDate());
            result.setUpdatedAt(project.getUpdatedAt());
        });

        projectRepo.save(findProject.get());
        throw new ProjectExceptionHandler(HttpStatus.OK, response, String.format("Project with identifier %s was updated", project.getIdentifier()));
    }

    public Optional<Project> findProjectByIdentifier(
            HttpStatus status,
            String projectIdentifier,
            HttpServletResponse response,
            String passMessage) {
        String message = !passMessage.isEmpty() ? passMessage : "Project with identifier " + projectIdentifier.toUpperCase() + " does not exists";
        return projectRepo.findProjectByIdentifier(projectIdentifier)
                .map(Optional::of)
                .orElseThrow( () -> new ProjectExceptionHandler(
                        status,
                        response,
                        message
                ));
    }

    private void findByIdentifier(String projectIdentifier, HttpServletResponse response) {
        String message = "Project with identifier " + projectIdentifier.toUpperCase() + " already exist";
        if (projectRepo.findProjectByIdentifier(projectIdentifier).isPresent()){
            throw new ProjectExceptionHandler(HttpStatus.FOUND, response, message);
        }
    }
}
