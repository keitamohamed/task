package com.keita.task.service;

import com.keita.task.error_handler.InvalidInput;
import com.keita.task.model.ProjectTask;
import com.keita.task.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
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
    }

    public void updateTask(ProjectTask task, Long id) {
        Optional<ProjectTask> findTask = findByID(id);
        findTask.ifPresent(result -> {
            result.setStatus(task.getStatus());
            result.setPriority(task.getPriority());
            result.setSummary(task.getSummary());
            result.setDueDate(task.getDueDate());
            result.setUpdatedAt(getDate());
        });
    }

    public void deleteTask(Long taskID) {
        Optional<ProjectTask> findTask = findByID(taskID);
        if (findTask.isEmpty()) {
            System.out.println("");
        }
        taskRepo.deleteByTaskID(taskID);
    }

    public Optional<ProjectTask> findByID(Long taskID) {
        return taskRepo.findById(taskID)
                .map(Optional::of).orElseThrow(() -> new IllegalArgumentException("Invalid task id"));
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
