package com.keita.task.error_handler;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class CustomData {
    public CustomData(HttpServletResponse response, Map<?, ?> data) {
        MessageHandler.customData(response, data);
    }
}
