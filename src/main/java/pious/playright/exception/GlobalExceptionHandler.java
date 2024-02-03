package pious.playright.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserNotFoundException.class)
    public void handleUserNotFoundException(UserNotFoundException exception) {
        LOGGER.error("User not found", exception);
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicateUserException.class)
    public void handleDuplicateUserException(DuplicateUserException exception) {
        LOGGER.error("Duplicate user", exception);
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserEmailNotVerifiedException.class)
    public void handleUserEmailNotVerifiedException(UserEmailNotVerifiedException exception) {
        LOGGER.error("User email not verified", exception);
    }
}
