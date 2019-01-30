package fr.autostopfrance.Autostop.security;

public class SecurityConstants {
    public final static long EXPIRATION_TIME = 864000000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/users/create";
    public static final String TOKEN_SECRET = "jf9i4jgu83ngl0";
    public static final String IMAGE_PROFILE = "/downloadFile/**";
    public static final String DRIVER = "/drivers/**";
}
