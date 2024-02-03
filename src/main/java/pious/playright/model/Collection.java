package pious.playright.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "collections")
public class Collection {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private  String name;

    @OneToMany(mappedBy = "collection", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<File> files;
}
