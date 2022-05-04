package com.keita.task.error_handler;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;

public class InvalidInput extends RuntimeException{

    public InvalidInput(BindingResult result, HttpServletResponse response, String message) {
        super(message);
        MessageHandler.message(result, response, HttpStatus.NOT_ACCEPTABLE);
    }
}
