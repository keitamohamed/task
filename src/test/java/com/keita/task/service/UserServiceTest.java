package com.keita.task.service;

import com.keita.task.model.Authenticate;
import com.keita.task.model.User;
import com.keita.task.repository.AuthRepo;
import com.keita.task.repository.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class UserServiceTest {

    @Mock
    private UserRepo userRepo;
    @Mock
    private AuthRepo authRepo;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private BindingResult bindingResult;
    @Mock
    private HttpServletResponse httpServletResponse;
    @Captor ArgumentCaptor<User> argumentCaptor;

    @InjectMocks
    private UserService userServiceUnderTest;

    @BeforeEach
    void setUp() {
        userServiceUnderTest = new UserService(passwordEncoder, userRepo, authRepo);
    }

    @Test
    void save() {

        User user = new User();
        Authenticate authenticate = new Authenticate();

        user.setUserID(6231L);
        user.setFirstName("John");
        user.setLastName("Smith");

        authenticate.setAuthID(73821L);
        authenticate.setPassword("smithj784");
        authenticate.setEmail("smithj761@gmail.com");

        user.setAuth(authenticate);

        given(userRepo.findById(user.getUserID())).willReturn(Optional.empty());

//        userServiceUnderTest.save(user, bindingResult, httpServletResponse);
        assertThatThrownBy(() -> userServiceUnderTest.save(user, bindingResult, httpServletResponse));

        then(userRepo).should().save(argumentCaptor.capture());

        User captorValue = argumentCaptor.getValue();
        assertThat(captorValue).isEqualTo(user);
    }

    @Test
    void projects() {
    }

    @Test
    void customData() {
        String email = "johnsmith@gmail.com";

        when(authRepo.findByEmail(email)).thenReturn(new Authenticate());
        assertThatThrownBy(() -> userServiceUnderTest.customData(email, httpServletResponse))
                .isInstanceOf(NullPointerException.class);
        verify(authRepo, times(1)).findByEmail(email);
    }

    @Test
    void findAllUser() {
    }

    @Test
    void findUserByUserID() {
        Long userID = 213L;

        when(userRepo.findById(userID)).thenReturn(Optional.of(new User()));
        userServiceUnderTest.findUserByUserID(userID, httpServletResponse);

        verify(userRepo, times(1)).findById(userID);
    }

    @Test
    void findUserByUserIDShouldThrowException() {
        Long userID = 213L;

        User user = new User();
        Authenticate authenticate = new Authenticate();

        user.setUserID(6231L);
        user.setFirstName("John");
        user.setLastName("Smith");

        authenticate.setAuthID(73821L);
        authenticate.setPassword("smithj784");
        authenticate.setEmail("smithj761@gmail.com");

        assertThatThrownBy(() -> userServiceUnderTest.findUserByUserID(userID, httpServletResponse))
                .isInstanceOf(IllegalArgumentException.class);

    }
}