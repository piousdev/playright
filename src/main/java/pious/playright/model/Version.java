package pious.playright.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "versions")
public class Version {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            type = org.hibernate.id.uuid.UuidGenerator.class
    )
    private UUID id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fileId", nullable = false)
    private File file;

    @Column(nullable = false, columnDefinition = "VARCHAR(255) default '1.0.0'")
    private String version;

    private String content;
    private String createdById;
    private String changeDescription;

    @Column(nullable = false)
    private String status = "draft";

    @CreationTimestamp
    private LocalDateTime createdAt;
}