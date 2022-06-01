package com.keita.task.service;

import com.keita.task.error_handler.InvalidInput;
import com.keita.task.error_handler.ProjectExceptionHandler;
import com.keita.task.error_handler.SuccessfulHandler;
import com.keita.task.model.Project;
import com.keita.task.model.ProjectTask;
import com.keita.task.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepo taskRepo;

    @Autowired
    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public void save(Project project, ProjectTask task, BindingResult result, HttpServletResponse response) {
        if (result.hasErrors()) {
            throw new InvalidInput(result, response, "Invalid input fields. Make sure all required fields are valid");
        }
        task.setCreateAt(getDate());
        task.setTask(project);
        taskRepo.save(task);
        new SuccessfulHandler(response, String.format("Task with an id %s have been added", task.getTaskID()));
    }

    public void updateTask(ProjectTask task, Long id, HttpServletResponse response) {
        Optional<ProjectTask> findTask = findTaskByID(id, response);
        findTask.ifPresent(result -> {
            result.setStatus(task.getStatus());
            result.setPriority(task.getPriority());
            result.setSummary(task.getSummary());
            result.setDueDate(task.getDueDate());
            result.setUpdatedAt(getDate());
        });
        taskRepo.save(findTask.get());
        new SuccessfulHandler(response, String.format("Successfully updated task with an id %s", id));
    }

    public void deleteTask(Long taskID, HttpServletResponse response) {
        Optional<ProjectTask> findTask = findTaskByID(taskID, response);
        if (findTask.isEmpty()) {
            String message = "Request not process. There is no task with an id " + taskID + ".";
            throw new ProjectExceptionHandler(HttpStatus.BAD_REQUEST, response, message);
        }
        taskRepo.deleteByTaskID(taskID);
        new SuccessfulHandler(response, String.format("Successfully deleted task with an id %s", taskID));
    }

    public List<ProjectTask> taskDueSoon(HttpServletResponse response) {
        List<ProjectTask> tasks = projectTaskList(response);
        return (tasks
                .stream()
                .sorted(Comparator.comparing(ProjectTask::getDueDate))
                .sorted((o1, o2) -> {
                    if (o1.getPriority().equals(o2.getPriority()) && o1.getPriority().equals("High"))
                        return -1;
                    else if (o1.getPriority().compareTo(o2.getPriority()) > 1 && o2.getPriority().equals("Medium"))
                        return 0;
                    return 1;
                })
                .collect(Collectors.toList()));

    }

    public List<ProjectTask> projectTask (Project project) {
        return project.getTask()
                .stream()
                .sorted(Comparator.comparing(ProjectTask::getDueDate))
                .collect(Collectors.toList());
    }

    public List<ProjectTask> sortTaskByPriority(HttpServletResponse response) {
        List<ProjectTask> tasks = projectTaskList(response);
        return (tasks
                .stream()
                .sorted(Comparator.comparing(ProjectTask::getDueDate))
                .sorted(Comparator.comparing(ProjectTask::getPriority))
                .collect(Collectors.toList())
        );
    }

    public List<ProjectTask> sortProjectTaskByDueDateAndPriority(Project project) {
        return (project.getTask()
                .stream()
                .sorted(Comparator.comparing(ProjectTask::getDueDate))
                .sorted(Comparator.comparing(ProjectTask::getPriority))
                .collect(Collectors.toList())
        );
    }

    public Optional<ProjectTask> findTaskByID(Long taskID, HttpServletResponse response) {
        String message = String.format("No task match with an id %s.", taskID);
        return taskRepo.findById(taskID)
                .map(Optional::of).orElseThrow(() ->
                        new ProjectExceptionHandler(HttpStatus.BAD_REQUEST, response, message));
    }

    public List<ProjectTask> projectTaskList(HttpServletResponse response) {
        List<ProjectTask> tasks = taskRepo.projectTaskList();
        if (tasks.isEmpty()) {
            throw new ProjectExceptionHandler(
                    HttpStatus.OK,
                    response,
                    "No tasks to load.");
        }
        return tasks;
    }

    private Date getDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String strDate = LocalDate.now().format(formatter);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        try {
            return format.parse(strDate);
        } catch (ParseException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

}

