package com.datamaster.lms.dto.response;

import java.util.UUID;

public record UserResponse(
        UUID id,
        String fullName,
        String email,
        String role,
        String avatarUrl
) {}
