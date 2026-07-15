package com.datamaster.lms.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpRateLimiter {

    // Keyed by lowercase email. Fine for a single-instance deployment; move to Redis-backed
    // buckets if the backend ever scales horizontally.
    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    public boolean tryConsume(String email) {
        Bucket bucket = buckets.computeIfAbsent(email.toLowerCase(), key -> newBucket());
        return bucket.tryConsume(1);
    }

    private Bucket newBucket() {
        // 3 OTP requests per 10 minutes per email address
        Bandwidth limit = Bandwidth.classic(3, io.github.bucket4j.Refill.intervally(3, Duration.ofMinutes(10)));
        return Bucket.builder().addLimit(limit).build();
    }
}
