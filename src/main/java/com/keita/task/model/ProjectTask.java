package com.keita.task.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskID;
    @NotBlank(message = "Task summary is required")
    private String summary;
    @NotBlank(message = "Task status is required")
    private String status;
    @NotBlank
    private String priority;
    @NotNull(message = "Task due date is required")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date dueDate;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createAt;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updatedAt;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "id")
    @JsonBackReference(value = "task")
    private Project task;
}
