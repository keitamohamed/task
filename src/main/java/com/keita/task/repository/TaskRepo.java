package com.keita.task.repository;

import com.keita.task.model.ProjectTask;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TaskRepo extends CrudRepository<ProjectTask, Long> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM ProjectTask task WHERE task.taskID = :taskId")
    void deleteByTaskID(@Param("taskId") Long taskId);

    @Query(value = "SELECT task FROM ProjectTask task")
    List<ProjectTask> projectTaskList();
}
