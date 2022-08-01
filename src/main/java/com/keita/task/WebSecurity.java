package com.keita.task;

import com.keita.task.auth.UserAuthDetailsService;
import com.keita.task.config.JwtConfig;
import com.keita.task.jwt.CustomAuthenticationFilter;
import com.keita.task.jwt.JWTToken;
import com.keita.task.jwt.JwtCustomAuthorizationFilter;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configurable
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private final JwtConfig jwtConfig;
    private final UserAuthDetailsService authDetailsService;
    private final JWTToken jwtToken;

    private static final String[] PUBLIC_ACCESS = {
            "/",
            "/favicon.icon",
            "/**/*.png",
            "/**/*.jpg",
            "/**/*.gif",
            "/**/*.svg",
            "/**/*.html",
            "/**/*.css",
            "/**/*.js",
            "/task/user/register"
    };

    private static String[] USER_ACCESS = {
            "/task/product/**",
            "/task/user/**"
    };

    public WebSecurity(UserAuthDetailsService authDetailsService, JwtConfig jwtConfig, JWTToken jwtToken) {
        this.jwtConfig = jwtConfig;
        this.authDetailsService = authDetailsService;
        this.jwtToken = jwtToken;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(jwtConfig, authenticationManagerBean(), jwtToken);
        customAuthenticationFilter.setFilterProcessesUrl("/task/login");
        http
                .csrf()
                .disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(PUBLIC_ACCESS).permitAll()
                .antMatchers(USER_ACCESS).hasAnyAuthority("ROLE_USER")
                .and()
                .addFilter(customAuthenticationFilter)
                .addFilterBefore(new JwtCustomAuthorizationFilter(jwtConfig, jwtToken), UsernamePasswordAuthenticationFilter.class)
                .formLogin()
                .disable();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
