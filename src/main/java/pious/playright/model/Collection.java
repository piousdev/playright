package pious.playright.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "collections")
public class Collection {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            type = org.hibernate.id.uuid.UuidGenerator.class
    )
    private UUID id;

    @Column(nullable = false)
    private  String name;

    @OneToMany(mappedBy = "collection", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<File> files;
}
