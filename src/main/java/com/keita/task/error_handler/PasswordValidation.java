package com.keita.task.error_handler;

import javax.servlet.http.HttpServletResponse;

public class PasswordValidation extends RuntimeException{

     public PasswordValidation(HttpServletResponse response, String message) {
         super("Password not meet requirement");
         MessageHandler.message(response, message);
     }
}
