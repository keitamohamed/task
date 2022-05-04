package com.keita.task;

import com.keita.task.auth.UserAuthDetailsService;
import com.keita.task.config.JwtConfig;
import com.keita.task.jwt.CustomAuthenticationFilter;
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

    private static final String[] PUBLIC_ACCESS = {
            "/task/user/register"
    };

    private static String[] USER_ACCESS = {
            "/task/product/**",
            "/task/user/**"
    };

    public WebSecurity(UserAuthDetailsService authDetailsService, JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
        this.authDetailsService = authDetailsService;
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
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(jwtConfig, authenticationManagerBean());
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
                .addFilterBefore(new JwtCustomAuthorizationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class)
                .formLogin()
                .disable();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
