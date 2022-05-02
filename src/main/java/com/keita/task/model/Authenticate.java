package com.keita.task.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Authenticate {

    @Id
    private Long authID;
    @NotBlank(message = "Email is required")
    @Column(updatable = false, unique = true)
    private String email;
    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 8, message = "Password must be between 6 to 8 character in length")
    private String password;
    private String role;
    private boolean isAccountNonExpired;
    private boolean isAccountNotLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "userID")
    @JsonBackReference(value = "auth")
    private User auth;
}
