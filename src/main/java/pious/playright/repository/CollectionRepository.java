package pious.playright.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pious.playright.model.Collection;

import java.util.UUID;

public interface CollectionRepository extends JpaRepository<Collection, UUID> {
}
