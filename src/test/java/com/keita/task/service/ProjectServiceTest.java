package com.keita.task.service;

import com.keita.task.model.Project;
import com.keita.task.model.User;
import com.keita.task.repository.ProjectRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {
    @Mock
    private ProjectRepo projectRepo;
    @Mock
    private HttpServletResponse httpServletResponse;
    @Mock
    private BindingResult bindingResult;
    @Mock
    private TaskService taskService;
    @Captor ArgumentCaptor<Project> argumentCaptor;

    @InjectMocks
    private ProjectService underTest;

    @BeforeEach
    void setUp() {
        underTest = new ProjectService(projectRepo, taskService);
    }

    @Test
    void isShouldSave() {
        // GIVEN PROJECT INFORMATION
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


        // No project with identifier passed
        given(projectRepo.findProjectByIdentifier(project.getIdentifier()))
                .willReturn(Optional.empty());

        //WHEN
        //... IT SHOULD SAVE THE NEW PROJECT
        underTest.save(user, project, bindingResult, httpServletResponse);

        //THEN...
        // IT SHOULD SAVE THE PROJECT AND CAPTURE THE SAVE VALUE
        then(projectRepo).should().save(argumentCaptor.capture());
        Project captorValue = argumentCaptor.getValue();
        // IT SHOULD CHECK THAT THE CAPTURE REQUEST IS EQUAL TO PROJECT
        assertThat(captorValue).isEqualTo(project);
    }
    @Test
    void isShouldNotSaveProject() {
        // GIVEN PROJECT INFO
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


        // NO PROJECT WITH IDENTIFIER PASSED
        given(projectRepo.findProjectByIdentifier(project.getIdentifier()))
                .willReturn(Optional.of(project));

        //WHEN... IT SHOULD THROW ILLEGAL ARGUMENT EXCEPTION
        assertThatThrownBy(() -> underTest.save(user, project, bindingResult, httpServletResponse))
                .isInstanceOf(IllegalArgumentException.class);

        //THEN... IT SHOULD NEVER SAVE PROJECT
        then(projectRepo).should(never()).save(any(Project.class));
    }

    @Test
    void isShouldFindProjectByIdentifier() {

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


        // WHEN Project identifier is given, Will return empty object
        given(projectRepo.findProjectByIdentifier(project.getIdentifier()))
                .willReturn(Optional.empty());

        underTest.save(user, project, bindingResult, httpServletResponse);

        //THEN...
        // IT SHOULD SAVE THE PROJECT AND CAPTURE THE SAVE VALUE
        then(projectRepo).should().save(argumentCaptor.capture());
    }

    @Test
    void findProjectByIdentifierShouldNotThrowAnyException() {

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


        // WHEN Project identifier is given, Will return empty object
        given(projectRepo.findProjectByIdentifier(project.getIdentifier()))
                .willReturn(Optional.empty());

        assertThatCode(() -> underTest.findProjectByIdentifier(project.getIdentifier(), httpServletResponse))
                .doesNotThrowAnyException();
    }

    @Test
    void itShouldDueSoon() {
    }

    @Test
    void itShouldDeleteProjectByIdentifier() {
        String identifier = "RAG12";

        lenient().when(projectRepo.findProjectByIdentifier(identifier)).thenReturn(Optional.of(new Project()));
        lenient().doNothing().when(projectRepo).deleteById(1L);

        assertThatThrownBy(() -> underTest.deleteProjectByIdentifier(identifier, httpServletResponse))
                .isInstanceOf(IllegalArgumentException.class);

        verify(projectRepo, times(1)).findProjectByIdentifier("RAG12");
    }

    @Test
    void itShouldFindAllProject() {
        underTest.findAll();
        verify(projectRepo, times(1)).findAll();
    }

    @Test
    void itShouldNotFindAllProject() {
        assertThatThrownBy(() -> underTest.findAllProject(httpServletResponse))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void itShouldUpdateProject() {
        ZoneId defaultZoneId = ZoneId.systemDefault();

        Project project = new Project();

        LocalDate localDate = LocalDate.of(2020, 7, 23);
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

        project.setId(1L);
        project.setDescription("Test");
        project.setIdentifier("RAG12");
        project.setName("Test");
        project.setStartDate(date);
        project.setEndDate(date);

        lenient().when(projectRepo.findProjectByIdentifier(project.getIdentifier())).thenReturn(Optional.ofNullable(project));
        lenient().doReturn(null).when(projectRepo).save(project);

        assertThatThrownBy(() -> underTest.updateProject(project, httpServletResponse))
                .isInstanceOf(IllegalArgumentException.class);

        verify(projectRepo, times(1)).findProjectByIdentifier("RAG12");
        verify(projectRepo, times(1)).save(project);
    }

    @Test
    void itShouldFindProjectTaskSortByDueDateAndPriority() {
        String identifier = "RAG12";

        lenient().when(projectRepo.findProjectByIdentifier(identifier)).thenReturn(Optional.of(new Project()));

        underTest.findProjectTaskSortByDueDateAndPriority(identifier, httpServletResponse);
        verify(projectRepo, times(1)).findProjectByIdentifier("RAG12");
    }
}