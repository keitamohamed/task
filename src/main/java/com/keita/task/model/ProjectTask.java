package com.keita.task.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskID;
    @NotBlank(message = "Task summary is required")
    private String summary;
    @NotBlank(message = "Task status is required")
    private String status;
    @NotBlank(message = "Task priority is required")
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

    public ProjectTask(Long taskID, String summary, String status, String priority, Date dueDate) {
        this.taskID = taskID;
        this.summary = summary;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}
