package com.datamaster.lms.dto.response;

public record AuthResponse(
        String accessToken,
        UserResponse user
) {}
