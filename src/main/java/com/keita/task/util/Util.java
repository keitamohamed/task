package com.keita.task.util;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class Util {
    private static final int MAGIC = 3600;
    public static Long generateID(int bound) {
        Random random = new Random();
        return (long) random.nextInt(bound);
    }

    public static Date accessTokenExpirationDate(int numberOfHour) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR_OF_DAY, numberOfHour);
        return calendar.getTime();
    }
    public static Date refreshTokenExpirationDate(int numberOfHour) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR_OF_DAY, + numberOfHour);
        return calendar.getTime();
    }

    public static  int maxAge(int maxAge) {
        return ((60 * 60) * maxAge);
    }
}
