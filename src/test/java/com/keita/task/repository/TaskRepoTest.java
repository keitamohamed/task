package com.keita.task.repository;

import com.keita.task.model.ProjectTask;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest(
        properties = {
                "spring.jpa.properties.javax.persistence.validation.mode=none"
        }
)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TaskRepoTest {

    @Autowired
    private TaskRepo taskRepo;

    @Test
    void deleteByTaskID() {
    }

    @Test
    void projectTaskList() {
        List<ProjectTask> tasks = taskRepo.projectTaskList();
        assertThat(tasks)
                .isNotNull()
                .hasSizeGreaterThan(1);

    }
}