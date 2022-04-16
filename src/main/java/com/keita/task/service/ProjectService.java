package com.keita.task.service;

import com.keita.task.error_handler.InvalidInput;
import com.keita.task.error_handler.ProjectFound;
import com.keita.task.model.Project;
import com.keita.task.repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;

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

        try {
            project.setIdentifier(project.getIdentifier().toUpperCase());
            projectRepo.save(project);
        }
        catch (Exception e) {
            throw new ProjectFound(
                    HttpStatus.FOUND,
                    response,
                    "Project with identifier " + project.getIdentifier().toUpperCase() + " already exists"
            );
        }
    }
}
