package pious.playright.controller;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pious.playright.model.UserWebHookEvent;
import pious.playright.service.UserService;

@RestController
@AllArgsConstructor
public class UserWebhookController {
    private final UserService userService;

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody UserWebHookEvent userWebHookEvent) {
        try {
            userService.processWebhookEvent(userWebHookEvent);
            return ResponseEntity.ok("User processed successfully");
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
