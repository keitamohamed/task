package com.keita.task.repository;

import com.keita.task.model.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepo extends CrudRepository<Project, Long> {

    @Query(value =
            "SELECT * " +
                    "FROM taskie.project as p " +
                    "WHERE p.identifier = :identifier", nativeQuery = true)
    Optional<Project> findProjectByIdentifier(
            @Param("identifier") String identifier);

    @Query(value = "SELECT * FROM taskie.project", nativeQuery = true)
    List<Project> findAll();

}
