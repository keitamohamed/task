package com.keita.task.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(value = {"userID"}, allowGetters = true)
public class User {

    @Id
    private Long userID;
    @NotBlank(message = "First name is required")
    private String firstName;
    @NotBlank(message = "Last name is required")
    private String lastName;

    @OneToOne(mappedBy = "auth", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference(value = "auth")
    private Authenticate auth;
}
