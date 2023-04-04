package com.gombisoft.servicedesk.texts;

public enum ErrorMessage {
    USERNAME_TAKEN("This username: \"%s\" has already been taken.", "Ez a felhasználónév: \"%s\" már foglalt."),
    USERNAME_INVALID("The username: \"%s\" must be a minimum 5 character length lowercase word without any whitespace or special characters.", "A felhasználónév: \"%s\" legalább 5 karakter hosszú, kisbetűs és nem tartalmazhat szóközt vagy speciális karaktert."),
    WRONG_USERNAME_OR_PASSWORD("Wrong username or password.", "Hibás felhasználónév vagy jelszó.");
    private final String messageEn;
    private final String messageHu;

    private ErrorMessage(String messageEn, String messageHu) {
        this.messageEn = messageEn;
        this.messageHu = messageHu;
    }

    public String getMessage(String language, String... args) {
        if (language.equals("hu")) {
            return String.format(messageHu, (Object[]) args);
        } else {
            return String.format(messageEn, (Object[]) args);
        }
    }
}