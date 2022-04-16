package com.keita.task.repository;

import com.keita.task.model.ProjectTask;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepo extends CrudRepository<ProjectTask, Long> {

    @Modifying
    @Query(value = "DELETE " +
            "FROM ProjectTask as task " +
            "WHERE task.taskID = :taskID",
            nativeQuery = true)
    void deleteByTaskID(Long taskID);
}
