package com.datamaster.lms.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class CookieUtil {

    public static final String REFRESH_COOKIE_NAME = "refreshToken";

    @Value("${security.cookie.same-site:Lax}")
    private String sameSite;

    @Value("${security.cookie.secure:true}")
    private boolean secure;

    /**
     * Builds the Set-Cookie header for the refresh token.
     * remember-me = true -> persists 30 days; false -> session-length cookie capped at 1 day server-side.
     */
    public ResponseCookie buildRefreshCookie(String rawToken, Duration maxAge) {
        return ResponseCookie.from(REFRESH_COOKIE_NAME, rawToken)
                .httpOnly(true)
                .secure(secure)
                .sameSite(sameSite)
                .path("/api/v1/auth")
                .maxAge(maxAge)
                .build();
    }

    public ResponseCookie buildExpiredCookie() {
        return ResponseCookie.from(REFRESH_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(secure)
                .sameSite(sameSite)
                .path("/api/v1/auth")
                .maxAge(0)
                .build();
    }
}
