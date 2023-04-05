package com.gombisoft.servicedesk.texts;

public enum ErrorMessage {
    USERNAME_TAKEN("This username: \"%s\" has already been taken.", "Ez a felhasználónév: \"%s\" már foglalt."),
    USERNAME_INVALID("The username: \"%s\" must be a minimum 5 character length lowercase word without any whitespace or special characters.", "A felhasználónév: \"%s\" legalább 5 karakter hosszú, kisbetűs és nem tartalmazhat szóközt vagy speciális karaktert."),
    WRONG_USERNAME_OR_PASSWORD("Wrong username or password.", "Hibás felhasználónév vagy jelszó."),
    PASSWORD_INVALID("The password must be a minimum of 6 characters long and can only contain letters, numbers, and optional special characters. It cannot contain any whitespace.", "A jelszónak legalább 6 karakter hosszúnak kell lennie és csak betűket, számokat és opcionálisan speciális karaktereket tartalmazhat. Nem tartalmazhat szóközt."),
    SESSION_EXPIRED("The session was expired. Please Login again.", "A munkamenet lejárt. Kérlek jelentkezz be újra!");
    private String errorMessageInEnglish;
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