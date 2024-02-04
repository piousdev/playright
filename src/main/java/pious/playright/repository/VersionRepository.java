package pious.playright.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pious.playright.model.Version;

import java.util.List;
import java.util.UUID;

public interface VersionRepository extends JpaRepository<Version, UUID> {
    List<Version> findByFileId(UUID fileId);
}
