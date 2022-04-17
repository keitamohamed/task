package com.keita.task.service;

import com.keita.task.error_handler.InvalidInput;
import com.keita.task.error_handler.ProjectExceptionHandler;
import com.keita.task.error_handler.SuccessfulHandler;
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
import java.util.Date;
import java.util.Locale;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepo taskRepo;

    @Autowired
    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public void save(ProjectTask task, BindingResult result, HttpServletResponse response) {
        if (result.hasErrors()) {
            throw new InvalidInput(result, response, "Invalid input fields. Make sure all required fields are valid");
        }
        taskRepo.save(task);
        new SuccessfulHandler(response, String.format("Task with an id %s have been added", task.getTaskID()));
    }

    public void updateTask(ProjectTask task, Long id, HttpServletResponse response) {
        Optional<ProjectTask> findTask = findByID(id, response);
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
        Optional<ProjectTask> findTask = findByID(taskID, response);
        if (findTask.isEmpty()) {
            System.out.println("");
        }
        taskRepo.deleteByTaskID(taskID);
    }

    public Optional<ProjectTask> findByID(Long taskID, HttpServletResponse response) {
        String message = String.format("No task match with an id %s.", taskID);
        return taskRepo.findById(taskID)
                .map(Optional::of).orElseThrow(() ->
                        new ProjectExceptionHandler(HttpStatus.BAD_REQUEST, response, message));
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
