package com.gombisoft.servicedesk.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DBUserDTO {
    private String username;
    private String email;
    private String password;
}
