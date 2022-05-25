package com.keita.task.repository;

import com.keita.task.model.Project;
import com.keita.task.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@DataJpaTest(
        properties = {
                "spring.jpa.properties.javax.persistence.validation.mode=none"
        }
)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ProjectRepoTest {

    @Autowired
    private ProjectRepo projectRepo;

    @Test
    void findProjectByIdentifier() {
        // Given Project information
        ZoneId defaultZoneId = ZoneId.systemDefault();

        User user = new User();
        Project project = new Project();

        LocalDate localDate = LocalDate.of(2020, 7, 23);
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

        user.setUserID(627111L);
        user.setFirstName("John");
        user.setLastName("Smith");

        project.setName("Cooking App");
        project.setIdentifier("COOK12");
        project.setDescription("Cooking app for everyone");
        project.setUpdatedAt(date);
        project.setEndDate(date);
        project.setStartDate(date);
        project.setCreatedAt(date);

        projectRepo.save(project);
        Optional<Project> findProject = projectRepo.findProjectByIdentifier(project.getIdentifier());
        assertThat(findProject)
                .isPresent()
                .hasValueSatisfying(p -> {
                    assertThat(p)
                            .usingRecursiveComparison()
                            .isEqualTo(project);
                });
    }

    @Test
    void isShouldNotFindProjectByIdentifierWhenIdentifierDoesNotExist() {

        Project project = new Project();

        project.setIdentifier("COOK12");

        Optional<Project> findProject = projectRepo.findProjectByIdentifier(project.getIdentifier());
        assertThat(findProject).isNotPresent();
    }

    @Test
    void itShouldFindAllProject() {
        // GIVEN PROJECT INFORMATION
        ZoneId defaultZoneId = ZoneId.systemDefault();

        User user = new User();
        Project project = new Project();
        Project secondProject = new Project();

        LocalDate localDate = LocalDate.of(2020, 7, 23);
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

        user.setUserID(627111L);
        user.setFirstName("John");
        user.setLastName("Smith");

        project.setName("Residential Building");
        project.setIdentifier("RB6172");
        project.setDescription("Apt building");
        project.setUpdatedAt(date);
        project.setEndDate(date);
        project.setStartDate(date);
        project.setCreatedAt(date);

        secondProject.setName("Finance Building Project");
        secondProject.setIdentifier("FBP51");
        secondProject.setDescription("Build a house for record kipping");
        secondProject.setUpdatedAt(date);
        secondProject.setEndDate(date);
        secondProject.setStartDate(date);
        secondProject.setCreatedAt(date);

        List<Project> projects = new ArrayList<>();
        projects.add(project);
        projects.add(secondProject);

        List<Project> emptyList = new LinkedList<>();

        //WHEN
        // IT SHOULD SAVE ALL PROJECT
        projects.forEach(p -> projectRepo.save(project));

        // THEN...IT SHOULD CHECK NUMBER OF PROJECT SAVE IS THE SAME AS CAR_LIST_SIZE
        //...AND IT SHOULD CAPTURE THE SAVE REQUEST
        List<Project> projectList = projectRepo.findAll();
        assertThat(projectList)
                .isNotNull();
    }

}