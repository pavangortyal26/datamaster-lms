package com.datamaster.lms.repository;

import com.datamaster.lms.entity.OtpCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public interface OtpCodeRepository extends JpaRepository<OtpCode, UUID> {

    Optional<OtpCode> findFirstByEmailAndConsumedFalseAndExpiresAtAfterOrderByCreatedAtDesc(
            String email, Instant now);
}
