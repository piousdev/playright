package pious.playright.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private UUID id;

    private String clerkId;

    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Name cannot be empty")
    private String name;

    private List<@NotNull UUID> fileIds;
}