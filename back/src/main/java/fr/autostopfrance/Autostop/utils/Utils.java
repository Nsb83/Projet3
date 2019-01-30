package fr.autostopfrance.Autostop.utils;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Random;

/**
 * Generate a random Id for User
 * in order to avoid using Mysql Id
 *
 * @see fr.autostopfrance.Autostop.services.UserService
 *
 */

@Service
public class Utils {
    private final Random RANDOM = new SecureRandom();
    private final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    public String generateUserId(int length) {
        return generateRandomString(length);
    }

    private String generateRandomString(int length) {
        StringBuilder returnValue = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            returnValue.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
        }

        return new String(returnValue);
    }
}
