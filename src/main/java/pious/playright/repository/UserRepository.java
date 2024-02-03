package pious.playright.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pious.playright.model.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
}
