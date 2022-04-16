package com.keita.task.repository;

import com.keita.task.model.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProjectRepo extends CrudRepository<Project, Long> {

    @Query(value =
            "SELECT * " +
                    "FROM Project as p " +
                    "WHERE p.identifier = :identifier", nativeQuery = true)
    Optional<Project> findProjectByIdentifier(
            @Param("identifier") String identifier);

    @Query(value =
            "SELECT CASE WHEN COUNT(p) > 0 THEN " +
                    "TRUE ELSE FALSE END " +
                    "FROM Project as p " +
                    "WHERE p.identifier = :identifier")
    Boolean findByIdentifier(String identifier);

    @Override
    Iterable<Project> findAllById(Iterable<Long> longs);
}
