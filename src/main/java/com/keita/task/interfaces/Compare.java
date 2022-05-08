package com.keita.task.interfaces;

import com.keita.task.model.ProjectTask;

import java.util.Comparator;

public interface Compare extends Comparator<ProjectTask> {
    int compare(ProjectTask first, ProjectTask second);
}
