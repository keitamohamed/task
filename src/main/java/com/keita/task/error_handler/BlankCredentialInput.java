package com.keita.task.error_handler;

import com.keita.task.model.Authenticate;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class BlankCredentialInput extends RuntimeException{

    public BlankCredentialInput(Authenticate authenticate, HttpStatus status, HttpServletResponse response) {

        super("Username and password is required");
        Map<String, Object> message = new HashMap<>();

        message.put("status", status.name());
        message.put("code", String.valueOf(status.value()));
        if (authenticate.getEmail().isEmpty()) {
            message.put("email", "Email is required");
        }
        if (authenticate.getPassword().isEmpty()) {
            message.put("password", "Password is required");
        }
        response.setContentType(APPLICATION_JSON_VALUE);
        try {
            new MessageMapper(response.getOutputStream(), message);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public BlankCredentialInput(String errorMessage, HttpStatus status, HttpServletResponse response) {

        super("Invalid username and password entered");
        Map<String, Object> message = new HashMap<>();
        message.put("status", status.name());
        message.put("code", String.valueOf(status.value()));
        message.put("message", errorMessage);
        response.setContentType(APPLICATION_JSON_VALUE);
        try {
            new MessageMapper(response.getOutputStream(), message);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
