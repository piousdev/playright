package pious.playright.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import pious.playright.dto.UserDTO;
import pious.playright.exception.DuplicateUserException;
import pious.playright.exception.UserNotFoundException;
import pious.playright.model.User;
import pious.playright.repository.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        log.info("Creating user with name: {}", userDTO.getName());
        validateUserEmailNotExist(userDTO.getEmail());
        return saveOrUpdateUser(userDTO, new User());
    }

    @Transactional
    public UserDTO updateUser(UUID id, UserDTO userDTO) {
        log.info("Updating user with id: {}", id);
        User user = findUserById(id);
        return saveOrUpdateUser(userDTO, user);
    }

    public List<User> getUsers() {
        log.info("Retrieving all users");
        return userRepository.findAll();
    }

    public UserDTO getUser(UUID id) {
        log.info("Retrieving user with id: " + id);
        User user;

        try {
            user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        } catch (Exception exception) {
            log.error("Error retrieving user", exception);
            throw exception;
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setClerkId(user.getClerkId());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        return userDTO;
    }

    @Transactional
    public void deleteUser(UUID id) {
        User user = findUserById(id);
        userRepository.delete(user);
        log.info("User deleted successfully with id: {}", id);
    }

    private User findUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    private void validateUserEmailNotExist(String email) {
        userRepository.findByEmail(email).ifPresent(u -> {
            throw new DuplicateUserException("User with email " + email + " already exists");
        });
    }

    private UserDTO saveOrUpdateUser(UserDTO userDTO, User user) {
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setClerkId(userDTO.getClerkId());
        User savedUser = userRepository.save(user);
        return toUserDTO(savedUser);
    }

    private UserDTO toUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setClerkId(user.getClerkId());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        return userDTO;
    }
}