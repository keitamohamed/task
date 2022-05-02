package com.keita.task.auth;

import com.keita.task.model.Authenticate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

public class UserAuthDetail implements UserDetails {

    private final Authenticate authenticate;
    private final Set<? extends GrantedAuthority> grantedAuthorities;

    public UserAuthDetail(Authenticate authenticate, Set<? extends GrantedAuthority> grantedAuthorities) {
        this.authenticate = authenticate;
        this.grantedAuthorities = grantedAuthorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return authenticate.getPassword();
    }

    @Override
    public String getUsername() {
        return authenticate.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return authenticate.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return authenticate.isAccountNotLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return authenticate.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return authenticate.isEnabled();
    }
}
