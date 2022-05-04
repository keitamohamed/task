package com.keita.task.error_handler;

import javax.servlet.http.HttpServletResponse;

public class SuccessfulHandler {
    public SuccessfulHandler(HttpServletResponse response, String message) {
        MessageHandler.message(response, message);
    }
}
