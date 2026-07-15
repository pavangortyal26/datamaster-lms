package com.datamaster.lms.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendOtpEmail(String toEmail, String code) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("Your Data Master Consulting login code");
            helper.setText("""
                    Your login code is: %s

                    This code expires in 5 minutes. If you didn't request this, you can ignore this email.
                    """.formatted(code));
            mailSender.send(message);
        } catch (MessagingException | RuntimeException ex) {
            // Never let a mail-provider failure surface to the user as a 500 — log and let
            // the OTP flow fail naturally when they try to verify a code they never received.
            log.error("Failed to send OTP email to {}", toEmail, ex);
        }
    }
}
