package com.keita.task.error_handler;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletResponse;

public class ProjectExceptionHandler extends RuntimeException{

    public ProjectExceptionHandler() {
        super();
    }

    public ProjectExceptionHandler(HttpStatus status, HttpServletResponse response, String message) {
        super(message);
        MessageHandler.projectIdentifierResponse(status, response, message);
    }
}
