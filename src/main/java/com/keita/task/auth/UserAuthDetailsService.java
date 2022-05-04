package com.keita.task.auth;

import com.keita.task.error_handler.ProjectExceptionHandler;
import com.keita.task.model.Authenticate;
import com.keita.task.repository.AuthRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.Set;

import static com.keita.task.permission.UserRole.*;

@Service
public class UserAuthDetailsService implements UserDetailsService {

    private final AuthRepo authRepo;
    private final HttpServletResponse response;

    @Autowired
    public UserAuthDetailsService(AuthRepo authRepo, HttpServletResponse response) {
        this.authRepo = authRepo;
        this.response = response;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Authenticate authenticate = authRepo.findByEmail(username);
        if (authenticate == null) {
            throw new ProjectExceptionHandler(HttpStatus.BAD_REQUEST, response, "You have entered an invalid username or password");
        }
        return new UserAuthDetail(authenticate, grantedAuthorities(authenticate));
    }

    private Set<SimpleGrantedAuthority> grantedAuthorities(Authenticate authenticate) {
        if (authenticate.getRole().equals("User")) {
            return USER.grantedAuthorities();
        }
        return ADMIN.grantedAuthorities();
    }
}
