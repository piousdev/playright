package pious.playright.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VersionDTO {
    private UUID id;
    private UUID fileId;
    private String version;
    private String content;
    private String createdById;
    private String changeDescription;
    private String status;
    private LocalDateTime createdAt;
}