package com.datamaster.lms.service;

import com.datamaster.lms.entity.OtpCode;
import com.datamaster.lms.exception.BadRequestException;
import com.datamaster.lms.exception.TooManyRequestsException;
import com.datamaster.lms.repository.OtpCodeRepository;
import com.datamaster.lms.security.OtpRateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpCodeRepository otpCodeRepository;
    private final EmailService emailService;
    private final OtpRateLimiter rateLimiter;

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final BCryptPasswordEncoder ENCODER = new BCryptPasswordEncoder(10);
    private static final int OTP_VALIDITY_MINUTES = 5;

    @Transactional
    public void requestOtp(String email) {
        if (!rateLimiter.tryConsume(email)) {
            throw new TooManyRequestsException(
                    "Too many OTP requests for this email. Please wait before trying again.");
        }

        String code = generateSixDigitCode();

        OtpCode otpCode = OtpCode.builder()
                .email(email.toLowerCase())
                .codeHash(ENCODER.encode(code))
                .expiresAt(Instant.now().plus(OTP_VALIDITY_MINUTES, ChronoUnit.MINUTES))
                .consumed(false)
                .build();
        otpCodeRepository.save(otpCode);

        emailService.sendOtpEmail(email, code);
    }

    @Transactional
    public void verifyOtp(String email, String code) {
        OtpCode otpCode = otpCodeRepository
                .findFirstByEmailAndConsumedFalseAndExpiresAtAfterOrderByCreatedAtDesc(
                        email.toLowerCase(), Instant.now())
                .orElseThrow(() -> new BadRequestException("Invalid or expired code. Please request a new one."));

        if (!ENCODER.matches(code, otpCode.getCodeHash())) {
            throw new BadRequestException("Invalid or expired code. Please request a new one.");
        }

        otpCode.setConsumed(true);
        otpCodeRepository.save(otpCode);
    }

    private String generateSixDigitCode() {
        int number = 100000 + RANDOM.nextInt(900000);
        return String.valueOf(number);
    }
}
