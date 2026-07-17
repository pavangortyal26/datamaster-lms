package com.datamaster.lms.dto.response;

import java.math.BigDecimal;
import java.util.UUID;

public record CourseSummaryResponse(
        UUID id,
        String slug,
        String title,
        String category,
        String description,
        String duration,
        String level,
        String instructorName,
        BigDecimal rating,
        Integer studentsCount,
        BigDecimal price,
        BigDecimal originalPrice,
        String thumbnailUrl,
        boolean isWishlisted
) {}
