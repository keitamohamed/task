package com.keita.task.error_handler;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;

public class ProjectExceptionHandler extends RuntimeException{

    public ProjectExceptionHandler() {
    }

    public void projectIdentifierException(BindingResult bindingResult, HttpServletResponse response, String message) {
        MessageHandler.bindingResult(response, message);
    }

    public ProjectExceptionHandler(HttpStatus status, HttpServletResponse response, String message) {
        MessageHandler.projectIdentifierResponse(status, response, message);
    }
}
