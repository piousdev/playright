package pious.playright.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pious.playright.model.File;

import java.util.UUID;

public interface FileRepository extends JpaRepository<File, UUID> {
}
