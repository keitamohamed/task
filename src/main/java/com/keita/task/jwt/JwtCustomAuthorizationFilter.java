package com.keita.task.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.keita.task.config.JwtConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class JwtCustomAuthorizationFilter extends OncePerRequestFilter {

    private final JwtConfig jwtConfig;
    private final JWTToken jwtToken;

    @Autowired
    public JwtCustomAuthorizationFilter(JwtConfig jwtConfig, JWTToken jwtToken) {
        this.jwtConfig = jwtConfig;
        this.jwtToken = jwtToken;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = jwtToken.getJwtRefreshToken(request);

        if (StringUtils.hasText(jwt) && doesRequestHeaderExist(request) && getDecodedJWT(jwt, response) != null) {
            DecodedJWT decodedJWT = getDecodedJWT(jwt, response);
            assert decodedJWT != null;
            String username = decodedJWT.getSubject();
            String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            stream(roles)
                    .forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private DecodedJWT getDecodedJWT(String token, HttpServletResponse response) throws IOException {

        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtConfig.getSecurityKey().getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        }catch (Exception exception) {
            response.setStatus(FORBIDDEN.value());

            Map<String, String> error = new HashMap<>();
            error.put("errorMessage", exception.getMessage());
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), error);
        }
        return null;
    }

    private boolean doesRequestHeaderExist(HttpServletRequest request) {
        return StringUtils.hasText(request.getHeader(jwtConfig.authorizationHeader()));
    }
}
