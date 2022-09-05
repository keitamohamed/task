package com.keita.task.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.keita.task.error_handler.BlankCredentialInput;
import com.keita.task.util.Util;
import lombok.extern.slf4j.Slf4j;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.keita.task.auth.UserAuthDetail;
import com.keita.task.config.JwtConfig;
import com.keita.task.model.Authenticate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtConfig jwtConfig;
    private final AuthenticationManager authenticationManager;
    private final JWTToken jwtToken;

    public CustomAuthenticationFilter(JwtConfig jwtConfig, AuthenticationManager authenticationManager, JWTToken jwtToken) {
        this.jwtConfig = jwtConfig;
        this.authenticationManager = authenticationManager;
        this.jwtToken = jwtToken;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            Authenticate authenticationInput = new ObjectMapper()
                    .readValue(request.getInputStream(), Authenticate.class);
            Authentication authentication = new UsernamePasswordAuthenticationToken(authenticationInput.getEmail(), authenticationInput.getPassword());
            if (authenticationInput.getEmail().isEmpty() || authenticationInput.getPassword().isEmpty()) {
                throw new BlankCredentialInput(authenticationInput, HttpStatus.NOT_ACCEPTABLE, response);
            }
            return authenticationManager.authenticate(authentication);
        }catch (IOException e) {
            throw new BlankCredentialInput("You have entered an invalid username or password", HttpStatus.BAD_REQUEST, response);
        }
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        throw new BlankCredentialInput("You have entered an invalid username or password", HttpStatus.BAD_REQUEST, response);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        UserAuthDetail user = (UserAuthDetail) authResult.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256(jwtConfig.getSecurityKey().getBytes());
        String accessToken = jwtToken.getAccessToken(user.getUsername(), user.getAuthorities(), algorithm, request);
        String refreshToken = jwtToken.getRefreshToken(user.getUsername(), algorithm, request);

        Map<String, String> token = new HashMap<>();
        token.put("taskAccessToken", accessToken);
        token.put("email", user.getUsername());
        user.getAuthorities()
                .forEach(object -> token.put(object.toString(), object.toString()));
        token.put("taskRefreshToken", refreshToken);

        JWTVerifier verifier = JWT.require(algorithm).build();

        int expireAt = (int)verifier.verify(accessToken).getExpiresAt().getTime();
        Cookie cookie = jwtToken.getCookie(accessToken, "taskAccessToken", user.getUsername(), expireAt);
        response.addCookie(cookie);
        cookie = jwtToken.getCookie(refreshToken, "taskRefreshToken", user.getUsername(), jwtConfig.getRefreshTokenExpirationDateInt());
        response.addCookie(cookie);

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper()
                .writeValue(response.getOutputStream(), token);
    }
}
