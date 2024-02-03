package pious.playright.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import pious.playright.dto.UserDTO;
import pious.playright.exception.DuplicateUserException;
import pious.playright.exception.UserEmailNotVerifiedException;
import pious.playright.exception.UserNotFoundException;
import pious.playright.model.File;
import pious.playright.model.User;
import pious.playright.model.UserWebHookEvent;
import pious.playright.repository.FileRepository;
import pious.playright.repository.UserRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final FileRepository fileRepository;

    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        log.info("Creating user: {}", userDTO);
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new DuplicateUserException("User with email " + userDTO.getEmail() + " already exists.");
        }
        User user = mapToEntity(userDTO, new User());
        return mapToDTO(userRepository.save(user));
    }

    @Transactional
    public void processWebhookEvent(UserWebHookEvent userWebHookEvent) {
        log.info("Processing webhook event: {}", userWebHookEvent);
        UserWebHookEvent.UserWebhookEventData eventData = userWebHookEvent.getData();

        String verifiedEmail = eventData.getEmailAddresses().stream()
                .filter(email -> "verified".equals(email.getVerification().getStatus()))
                .map(UserWebHookEvent.EmailAddress::getEmailAddress)
                .findFirst()
                .orElseThrow(() -> new UserEmailNotVerifiedException("No verified email found."));

        UserDTO userDTO = new UserDTO(null, eventData.getId(), verifiedEmail,
                eventData.getFirstName() + " " + eventData.getLastName(), null);
        ensureUserCreationOrUpdate(userDTO);
    }

    @Transactional
    public UserDTO updateUser(UUID id, UserDTO userDTO) {
        log.info("Updating user: {}", userDTO);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
        User updatedUser = mapToEntity(userDTO, user);
        return mapToDTO(userRepository.save(updatedUser));
    }

    public List<UserDTO> getUsers() {
        log.info("Retrieving all users");
        return userRepository
                .findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUser(UUID id) {
        log.info("Retrieving user with ID: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
        return mapToDTO(user);
    }

    @Transactional
    public void deleteUser(UUID id) {
        log.info("Deleting user with ID: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
        userRepository.delete(user);
    }

    private User mapToEntity(UserDTO userDTO, User user) {
        user.setClerkId(userDTO.getClerkId());
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());

        if (userDTO.getFileIds() != null && !userDTO.getFileIds().isEmpty()) {
            List<File> files = fileRepository.findAllById(userDTO.getFileIds());
            user.setFiles(files);
        }

        return user;
    }

    private UserDTO mapToDTO(User user) {
        List<UUID> fileIds = user.getFiles().stream()
                .map(File::getId)
                .collect(Collectors.toList());

        return new UserDTO(user.getId(), user.getClerkId(), user.getEmail(), user.getName(), fileIds);
    }

    private void ensureUserCreationOrUpdate(@NotNull UserDTO userDTO) {
        User user = userRepository.findByEmail(userDTO.getEmail()).orElse(new User());
        persistUserChanges(userDTO, user);
    }

    private void persistUserChanges(UserDTO userDTO, User user) {
        User savedUser = mapToEntity(userDTO, user);
        savedUser = userRepository.save(savedUser);
        mapToDTO(savedUser);
    }
}
