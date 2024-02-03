package pious.playright.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CollectionDTO {
    private UUID id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    private List<UUID> fileIds;
}
