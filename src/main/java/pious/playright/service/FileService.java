package pious.playright.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import pious.playright.exception.CollectionNotFoundException;
import pious.playright.exception.FileNotFoundException;
import pious.playright.exception.UserNotFoundException;
import pious.playright.model.Collection;
import pious.playright.model.File;
import pious.playright.model.User;
import pious.playright.model.Version;
import pious.playright.repository.CollectionRepository;
import pious.playright.repository.FileRepository;
import pious.playright.repository.UserRepository;
import pious.playright.repository.VersionRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {
    private static final Logger log = LoggerFactory.getLogger(FileService.class);
    private final FileRepository fileRepository;
    private final UserRepository userRepository;
    private final VersionRepository versionRepository;
    private final CollectionRepository collectionRepository;

    @Transactional
    public File createFile(UUID userId, String name, String description, String content, String language) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        File file = new File();
        file.setUser(user);
        file.setName(name);
        file.setDescription(description);
        file.setContent(content);
        file.setLanguage(language);
        file.setStarred(false); // Default value

        File savedFile = fileRepository.save(file);

        // Creation of initial version
        Version version = new Version();
        version.setFile(savedFile);
        version.setContent(content);
        versionRepository.save(version);

        log.info("File created with ID: {}", savedFile.getId());
        return savedFile;
    }

    @Transactional
    public File updateFile(UUID fileId, String name, String description, String language, Boolean starred) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found with ID: " + fileId));

        if (name != null) file.setName(name);
        if (description != null) file.setDescription(description);
        if (language != null) file.setLanguage(language);
        if (starred != null) file.setStarred(starred);

        return fileRepository.save(file);
    }

    @Transactional
    public void deleteFile(UUID fileId) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found with ID: " + fileId));
        fileRepository.delete(file);
        log.info("File deleted with ID: {}", fileId);
    }

    public File getFile(UUID fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found with ID: " + fileId));
    }

    public List<File> listFilesByUser(UUID userId) {
        return fileRepository.findByUserId(userId);
    }

    @Transactional
    public File addFileToCollection(UUID fileId, UUID collectionId) {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found with ID: " + fileId));

        Collection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new CollectionNotFoundException("Collection not found with ID: " + collectionId));

        file.setCollection(collection);
        return fileRepository.save(file);
    }

    @Transactional
    public void removeFileFromCollection(UUID fileId) {
        File file = getFile(fileId);
        file.setCollection(null);
        fileRepository.save(file);
    }

    public List<Version> listFileVersions(UUID fileId) {
        return versionRepository.findByFileId(fileId);
    }
}
