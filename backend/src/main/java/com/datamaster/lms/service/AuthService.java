package com.datamaster.lms.service;

import com.datamaster.lms.dto.response.AuthResponse;
import com.datamaster.lms.dto.response.UserResponse;
import com.datamaster.lms.entity.RefreshToken;
import com.datamaster.lms.entity.User;
import com.datamaster.lms.exception.BadRequestException;
import com.datamaster.lms.repository.RefreshTokenRepository;
import com.datamaster.lms.repository.UserRepository;
import com.datamaster.lms.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OtpService otpService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final BCryptPasswordEncoder TOKEN_ENCODER = new BCryptPasswordEncoder(10);
    private static final Duration REMEMBER_ME_TTL = Duration.ofDays(30);
    private static final Duration DEFAULT_TTL = Duration.ofDays(1);

    public record LoginResult(AuthResponse response, String rawRefreshToken, Duration cookieMaxAge) {}

    @Transactional
    public void requestOtp(String email) {
        // Create the user record on first login attempt so the OTP flow doubles as sign-up.
        userRepository.findByEmail(email.toLowerCase()).orElseGet(() -> userRepository.save(
                User.builder()
                        .email(email.toLowerCase())
                        .fullName(deriveNameFromEmail(email))
                        .role(User.Role.STUDENT)
                        .emailVerified(false)
                        .enabled(true)
                        .build()
        ));

        otpService.requestOtp(email);
    }

    @Transactional
    public LoginResult verifyOtpAndLogin(String email, String code, boolean rememberMe) {
        otpService.verifyOtp(email, code);

        User user = userRepository.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new BadRequestException("No account found for this email."));

        if (!user.isEmailVerified()) {
            user.setEmailVerified(true);
            userRepository.save(user);
        }

        String accessToken = jwtService.generateAccessToken(user, Map.of(
                "role", user.getRole().name(),
                "name", user.getFullName()
        ));

        Duration ttl = rememberMe ? REMEMBER_ME_TTL : DEFAULT_TTL;
        String rawRefreshToken = issueRefreshToken(user, ttl);

        AuthResponse response = new AuthResponse(accessToken, toUserResponse(user));
        return new LoginResult(response, rawRefreshToken, ttl);
    }

    @Transactional
    public LoginResult refresh(String rawRefreshToken) {
        if (rawRefreshToken == null || rawRefreshToken.isBlank()) {
            throw new BadRequestException("Missing refresh token.");
        }

        RefreshToken stored = findValidToken(rawRefreshToken)
                .orElseThrow(() -> new BadRequestException("Session expired. Please log in again."));

        User user = stored.getUser();

        // Rotate: revoke the used token and issue a fresh one, so a stolen refresh token
        // is only usable once before both client and attacker are logged out on next use.
        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        Duration remainingTtl = Duration.between(Instant.now(), stored.getExpiresAt());
        Duration ttl = remainingTtl.isNegative() ? DEFAULT_TTL : remainingTtl;
        String newRawToken = issueRefreshToken(user, ttl);

        String accessToken = jwtService.generateAccessToken(user, Map.of(
                "role", user.getRole().name(),
                "name", user.getFullName()
        ));

        AuthResponse response = new AuthResponse(accessToken, toUserResponse(user));
        return new LoginResult(response, newRawToken, ttl);
    }

    @Transactional
    public void logout(String rawRefreshToken) {
        if (rawRefreshToken == null || rawRefreshToken.isBlank()) {
            return;
        }
        findValidToken(rawRefreshToken).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    private String issueRefreshToken(User user, Duration ttl) {
        String rawToken = generateOpaqueToken();
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .tokenHash(hashToken(rawToken))
                .expiresAt(Instant.now().plus(ttl))
                .revoked(false)
                .build();
        refreshTokenRepository.save(refreshToken);
        return rawToken;
    }

    private java.util.Optional<RefreshToken> findValidToken(String rawToken) {
        return refreshTokenRepository.findByTokenHash(hashToken(rawToken))
                .filter(t -> !t.isRevoked())
                .filter(t -> t.getExpiresAt().isAfter(Instant.now()));
    }

    // Refresh tokens are high-entropy opaque strings, so a fast deterministic hash (not bcrypt)
    // is fine for the lookup key and avoids bcrypt's cost factor on every refresh request.
    private String hashToken(String rawToken) {
        try {
            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawToken.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte b : hash) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (java.security.NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 algorithm unavailable", e);
        }
    }

    private String generateOpaqueToken() {
        byte[] bytes = new byte[64];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String deriveNameFromEmail(String email) {
        String prefix = email.split("@")[0].replaceAll("[._]", " ");
        return prefix.substring(0, 1).toUpperCase() + prefix.substring(1);
    }

    private UserResponse toUserResponse(User user) {
        return new UserResponse(
                user.getId(), user.getFullName(), user.getEmail(),
                user.getRole().name(), user.getAvatarUrl());
    }
}
