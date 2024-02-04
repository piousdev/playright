package pious.playright.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pious.playright.model.File;
import pious.playright.model.Version;
import pious.playright.service.FileService;

import java.util.UUID;
import java.util.List;


@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173/*")
@AllArgsConstructor
public class FileController {
    private final FileService fileService;

    @PostMapping
    public ResponseEntity<File> createFile(@RequestBody UUID userId, String name, String description, String content, String language) {
        File createdFile = fileService.createFile(userId, name, description, content, language);
        return ResponseEntity.ok(createdFile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<File> updateFile(@PathVariable UUID id, String name, String description, String language, Boolean starred) {
        File updatedFile = fileService.updateFile(id, name, description, language, starred);
        return ResponseEntity.ok(updatedFile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable UUID id) {
        fileService.deleteFile(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{fileId}/collection")
    public ResponseEntity<?> removeFileFromCollection(@PathVariable UUID fileId) {
        fileService.removeFileFromCollection(fileId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<File> getFile(@PathVariable UUID id) {
        File file = fileService.getFile(id);
        return ResponseEntity.ok(file);
    }

    @GetMapping("/{fileId}/versions")
    public ResponseEntity<List<Version>> listFileVersions(@PathVariable UUID fileId) {
        List<Version> versions = fileService.listFileVersions(fileId);
        return ResponseEntity.ok(versions);
    }

    @PostMapping("/{fileId}/collection/{collectionId}")
    public ResponseEntity<File> addFileToCollection(@PathVariable UUID fileId, @PathVariable UUID collectionId) {
        File file = fileService.addFileToCollection(fileId, collectionId);
        return ResponseEntity.ok(file);
    }
}
