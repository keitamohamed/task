package com.keita.task.error_handler;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
public class MessageHandler {

    static void bindingResult(BindingResult bindingResult, HttpServletResponse response, HttpStatus status) {

        try {
            Map<String, Object> message = setErrorMessage(bindingResult, response, status);
            new ErrorMessageMapper(response.getOutputStream(), message);
        }catch (IOException exception) {
            System.out.println(exception.getMessage());
        }
    }

    private static Map<String, Object> setErrorMessage(BindingResult bindingResult, HttpServletResponse response, HttpStatus status) {
        Map<String, Object> message = new HashMap<>();
        Map<String, String> errorMap = new HashMap<>();

        message.put("status", status.name());
        for (FieldError error : bindingResult.getFieldErrors()) {
            errorMap.put(error.getField(), error.getDefaultMessage());
        }
        message.put("error", errorMap);
        response.setStatus(status.value());
        errorMap.put("code", String.valueOf(status.value()));
        response.setContentType(APPLICATION_JSON_VALUE);
        return message;
    }

    static void bindingResult(HttpServletResponse response, String message) {
        try {
            Map<String, String> errorMap = new HashMap<>();

            errorMap.put("projectIdentifier", message);
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            errorMap.put("status", String.valueOf(HttpServletResponse.SC_NOT_ACCEPTABLE));
            response.setContentType(APPLICATION_JSON_VALUE);
            new ErrorMessageMapper(response.getOutputStream(), errorMap);
        }catch (IOException exception) {
            System.out.println(exception.getMessage());
        }

    }

    static void projectIdentifierResponse(HttpStatus status, HttpServletResponse response, String message) {

        try {
            Map<String, String> errorMap = new HashMap<>();

            errorMap.put("status", status.name());
            errorMap.put("code", String.valueOf(status.value()));
            errorMap.put("message", message);
            response.setStatus(status.value());
            response.setContentType(APPLICATION_JSON_VALUE);
            new ErrorMessageMapper(response.getOutputStream(), errorMap);
        }catch (IOException exception) {
            System.out.println(exception.getMessage());
        }

    }
}
