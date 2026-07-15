package com.datamaster.lms.controller;

import com.datamaster.lms.dto.request.RequestOtpRequest;
import com.datamaster.lms.dto.request.VerifyOtpRequest;
import com.datamaster.lms.dto.response.AuthResponse;
import com.datamaster.lms.security.CookieUtil;
import com.datamaster.lms.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Email OTP login, token refresh, logout")
public class AuthController {

    private final AuthService authService;
    private final CookieUtil cookieUtil;

    @PostMapping("/otp/request")
    @Operation(summary = "Send a 6-digit login code to the given email")
    public ResponseEntity<Map<String, String>> requestOtp(@Valid @RequestBody RequestOtpRequest request) {
        authService.requestOtp(request.email());
        return ResponseEntity.ok(Map.of("message", "If that email is valid, a code has been sent."));
    }

    @PostMapping("/otp/verify")
    @Operation(summary = "Verify the OTP and log in, issuing an access token and a refresh cookie")
    public ResponseEntity<AuthResponse> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request,
            HttpServletResponse httpResponse
    ) {
        AuthService.LoginResult result = authService.verifyOtpAndLogin(
                request.email(), request.code(), request.rememberMe());

        ResponseCookie cookie = cookieUtil.buildRefreshCookie(result.rawRefreshToken(), result.cookieMaxAge());
        httpResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(result.response());
    }

    @PostMapping("/refresh")
    @Operation(summary = "Exchange a valid refresh cookie for a new access token, rotating the refresh token")
    public ResponseEntity<AuthResponse> refresh(
            @CookieValue(name = CookieUtil.REFRESH_COOKIE_NAME, required = false) String refreshToken,
            HttpServletResponse httpResponse
    ) {
        AuthService.LoginResult result = authService.refresh(refreshToken);

        ResponseCookie cookie = cookieUtil.buildRefreshCookie(result.rawRefreshToken(), result.cookieMaxAge());
        httpResponse.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(result.response());
    }

    @PostMapping("/logout")
    @Operation(summary = "Revoke the current refresh token and clear the cookie")
    public ResponseEntity<Map<String, String>> logout(
            @CookieValue(name = CookieUtil.REFRESH_COOKIE_NAME, required = false) String refreshToken,
            HttpServletResponse httpResponse
    ) {
        authService.logout(refreshToken);
        httpResponse.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.buildExpiredCookie().toString());
        return ResponseEntity.ok(Map.of("message", "Logged out."));
    }
}
