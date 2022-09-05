package com.keita.task.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.keita.task.config.JwtConfig;
import com.keita.task.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class JWTToken {

    private final JwtConfig jwtConfig;

    @Autowired
    public JWTToken(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    public String getAccessToken (String username, Collection<? extends GrantedAuthority> authority, Algorithm algorithm, HttpServletRequest request) {
        return (
                JWT.create()
                        .withSubject(username)
                        .withExpiresAt(Util.accessTokenExpirationDate(jwtConfig.getAccessTokenExpirationDateInt()))
                        .withIssuer(request.getRequestURI())
                        .withClaim(
                                "roles",
                                authority.stream()
                                        .map(GrantedAuthority::getAuthority)
                                        .collect(Collectors.toList())
                        )
                        .sign(algorithm)
        );
    }

    public String getRefreshToken (String username, Algorithm algorithm, HttpServletRequest request) {
        return (JWT.create()
                .withSubject(username)
                .withExpiresAt(Util.accessTokenExpirationDate(jwtConfig.getRefreshTokenExpirationDateInt()))
                .withIssuer(request.getRequestURI())
                .sign(algorithm));
    }

    public void deleteCookie(String tokenName, HttpServletResponse response) {
        Cookie jwtToken = new Cookie(tokenName, null);
        jwtToken.setPath("/");
        jwtToken.setHttpOnly(true);
        jwtToken.setSecure(true);
        jwtToken.setMaxAge(0);
        response.setContentType(APPLICATION_JSON_VALUE);
        response.addCookie(jwtToken);
    }

    public String getJwtRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
       if (cookies != null) {
           return Arrays.stream(cookies)
                   .filter(cookie -> cookie.getName().equals("taskAccessToken"))
                   .map(Cookie::getValue)
                   .findFirst()
                   .orElse(null);
       }
       return null;
    }

    public Cookie getCookie(String token, String tokenName, String username, int maxAge) {
        Cookie cookie = new Cookie(tokenName, token);
        if(tokenName.equals("taskRefreshToken")) {
            cookie.setHttpOnly(false);
            cookie.setSecure(true);
        }else {
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
        }
        cookie.setComment(username);
        cookie.setPath("/");
        cookie.setMaxAge(Util.maxAge(maxAge));
        return cookie;
    }

    private int multiple(int maxAge) {
        return (60 * maxAge);
    }

    public String getJwtFormRequest(String tokenName, HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, tokenName);
        Cookie[] cookies = request.getCookies();
        String authorization = request.getHeader(jwtConfig.authorizationHeader());
        if (StringUtils.hasText(authorization) && authorization.startsWith(jwtConfig.getTokenPrefix() + " ")) {
            return (authorization.replace(jwtConfig.getTokenPrefix(),"").replaceAll("\\s+", ""));
        }
        return null;
    }

    public DecodedJWT getDecodedJWT(String token, HttpServletResponse response) throws IOException {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtConfig.getSecurityKey().getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        }catch (Exception exception) {
            response.setStatus(FORBIDDEN.value());

            Map<String, String> error = new HashMap<>();
            error.put("message", exception.getMessage());
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), error);
        }
        return null;
    }
}
