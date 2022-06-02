package com.keita.task.service;

import com.keita.task.model.Project;
import com.keita.task.model.ProjectTask;
import com.keita.task.repository.TaskRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class TaskServiceTest {

    @Mock
    private TaskRepo taskRepoUnderTest;
    @Mock
    private HttpServletResponse response;
    @Mock
    private BindingResult result;
    @Captor
    private ArgumentCaptor<ProjectTask> argumentCaptor;

   @InjectMocks
    private TaskService taskServiceUnderTest;

    @BeforeEach
    void setUp() {
        taskServiceUnderTest = new TaskService(taskRepoUnderTest);
    }

    public Project project() {
        Project project = new Project();
        List<ProjectTask> tasks = new ArrayList<>();
        ZoneId defaultZoneId = ZoneId.systemDefault();

        LocalDate localDate = LocalDate.of(2020, 7, 23);
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

        tasks.add(new ProjectTask(231L, "Write book", "To Do", "Low", date));

        localDate = LocalDate.of(2020, 2, 14);
        date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

        tasks.add(new ProjectTask(271L, "Test the save method", "In Progress", "High", date));

        localDate = LocalDate.of(2019, 3, 17);
        date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());
        tasks.add(new ProjectTask(281L, "Write book", "To Do", "Low", date));

        project.setTask(tasks);
        return project;
    }

    @Test
    void save() {

        Project project = new Project();
        ProjectTask task = new ProjectTask();
        ZoneId defaultZoneId = ZoneId.systemDefault();

        LocalDate localDate = LocalDate.of(2020, 7, 23);
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

        project.setIdentifier("RAG12");

        task.setTaskID(1234L);
        task.setStatus("In Progress");
        task.setPriority("Low");
        task.setDueDate(date);


        // No project with identifier passed
        given(taskRepoUnderTest.findById(task.getTaskID()))
                .willReturn(Optional.empty());

        //WHEN
//        taskServiceUnderTest.save(project, task, result, response);
        assertThatThrownBy(() -> taskServiceUnderTest.save(project, task, result, response))
                .isInstanceOf(IllegalArgumentException.class);

        //THEN...
        then(taskRepoUnderTest).should().save(argumentCaptor.capture());
        ProjectTask captorValue = argumentCaptor.getValue();
        assertThat(captorValue).isEqualTo(task);
    }

    @Test
    void updateTask() {

        ProjectTask task = new ProjectTask();
        ZoneId defaultZoneId = ZoneId.systemDefault();

        LocalDate localDate = LocalDate.of(2020, 7, 23);
        Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

        task.setTaskID(1234L);
        task.setStatus("To Do");
        task.setPriority("High");
        task.setDueDate(date);

        lenient().when(taskRepoUnderTest.findById(task.getTaskID())).thenReturn(Optional.of(task));
        lenient().doReturn(null).when(taskRepoUnderTest).save(task);

//        taskServiceUnderTest.updateTask(task, task.getTaskID(), response);
        assertThatThrownBy(() -> taskServiceUnderTest.updateTask(task, task.getTaskID(), response))
                .isInstanceOf(IllegalArgumentException.class);

        verify(taskRepoUnderTest, times(1)).findById(task.getTaskID());
        verify(taskRepoUnderTest, times(1)).save(task);
    }

    @Test
    void deleteTask() {

        long id = 2L;

        lenient().when(taskRepoUnderTest.findById(id)).thenReturn(Optional.of(new ProjectTask()));
        lenient().doNothing().when(taskRepoUnderTest).deleteByTaskID(id);

        assertThatThrownBy(() -> taskServiceUnderTest.deleteTask(id, response))
                .isInstanceOf(IllegalArgumentException.class);

        verify(taskRepoUnderTest, times(1)).deleteByTaskID(id);
    }

    @Test
    void taskDueSoon() {
    }

    @Test
    void projectTask() {
        Project project = project();
        List<ProjectTask> tasks = project.getTask();
        taskServiceUnderTest.projectTask(project);
        assertThat(taskServiceUnderTest.projectTask(project))
                .isNotNull()
                .hasSizeGreaterThan(0)
                .satisfies(t -> assertThat(t.get(0)).isEqualTo(tasks.get(tasks.size() - 1)));

    }

    @Test
    void sortTaskByPriority() {

    }

    @Test
    void sortProjectTaskByDueDateAndPriority() {
        Project project = project();
        List<ProjectTask> tasks = project.getTask();
        taskServiceUnderTest.sortProjectTaskByDueDateAndPriority(project);
        assertThat(taskServiceUnderTest.sortProjectTaskByDueDateAndPriority(project))
                .isNotNull()
                .hasSizeGreaterThan(0)
                .satisfies(t -> assertThat(t.get(0)).isEqualTo(tasks.get(1)));
    }

    @Test
    void findTaskByID() {
        long id = 2L;

        lenient().when(taskRepoUnderTest.findById(id)).thenReturn(Optional.of(new ProjectTask()));

        taskServiceUnderTest.findTaskByID(id, response);

        verify(taskRepoUnderTest, times(1)).findById(id);
    }

    @Test
    void projectTaskList() {
//        taskServiceUnderTest.projectTaskList(response);
        assertThatThrownBy(() -> taskServiceUnderTest.projectTaskList(response))
                .isInstanceOf(IllegalArgumentException.class);
        verify(taskRepoUnderTest, times(1)).projectTaskList();
    }
}