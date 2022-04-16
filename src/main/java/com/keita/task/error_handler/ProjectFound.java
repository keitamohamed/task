package com.keita.task.error_handler;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;

public class ProjectFound extends RuntimeException{

    public ProjectFound() {
    }

    public void projectIdentifierException(BindingResult bindingResult, HttpServletResponse response, String message) {
        MessageHandler.bindingResult(response, message);
    }

    public ProjectFound(HttpStatus status, HttpServletResponse response, String message) {
        MessageHandler.projectIdentifierResponse(status, response, message);
    }
}
