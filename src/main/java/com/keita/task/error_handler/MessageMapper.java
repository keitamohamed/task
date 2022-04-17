package com.keita.task.error_handler;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;

public class MessageMapper extends ObjectMapper {
    public MessageMapper(OutputStream outputStream, Object o) throws IOException {
        super.writeValue(outputStream, o);
    }
}
