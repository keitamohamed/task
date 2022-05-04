package com.keita.task.util;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class Util {

    public static Long generateID(int bound) {
        Random random = new Random();
        return (long) random.nextInt(bound);
    }

    public static Date numberOfWeek(int numberOfDay) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DAY_OF_WEEK, numberOfDay);
        return calendar.getTime();
    }
}
