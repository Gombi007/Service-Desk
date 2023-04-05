package com.gombisoft.servicedesk.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Session {
    @Id
    private String id;
    private String userId;
    private String token;
    private Date valid;
    private boolean isValidSession;

}
