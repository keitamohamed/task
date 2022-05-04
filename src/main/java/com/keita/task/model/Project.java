package com.keita.task.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Project identifier is required")
    @Size(min = 4, max = 6, message = "Please use 4 to 6 character")
    @Column(updatable = false, unique = true)
    private String identifier;
    @NotBlank(message = "Project name is required")
    private String name;
    @NotBlank(message = "Project description is required")
    private String description;
    @NotNull(message = "Project start is required")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date startDate;
    @NotNull(message = "Project end is required")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date endDate;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdAt;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updatedAt;

    @JoinColumn(name = "userID")
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JsonBackReference(value = "project")
    private User project;

    @OneToMany(mappedBy = "task", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference(value = "task")
    private List<ProjectTask> task;

    public void addNewTask(ProjectTask newTask) {
        task.add(newTask);
    }
}
