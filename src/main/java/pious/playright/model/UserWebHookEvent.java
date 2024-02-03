package pious.playright.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserWebHookEvent {
    private UserWebhookEventData data;

    @Data
    @NoArgsConstructor
    public static class UserWebhookEventData {
        private String id;
        @JsonProperty("email_addresses")
        private List<EmailAddress> emailAddresses;
        @JsonProperty("first_name")
        private String firstName;
        @JsonProperty("last_name")
        private String lastName;
    }

    @Data
    @NoArgsConstructor
    public static class EmailAddress {
        @JsonProperty("email_address")
        private String emailAddress;
        private Verification verification;
    }

    @Data
    @NoArgsConstructor
    public static class Verification {
        private String status;
    }
}
