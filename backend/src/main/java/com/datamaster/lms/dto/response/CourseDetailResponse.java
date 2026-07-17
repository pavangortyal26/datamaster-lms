package com.datamaster.lms.dto.response;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record CourseDetailResponse(
        UUID id,
        String slug,
        String title,
        String category,
        String description,
        List<String> learningOutcomes,
        List<String> skills,
        String instructorName,
        String instructorBio,
        String duration,
        String level,
        BigDecimal rating,
        Integer studentsCount,
        BigDecimal price,
        BigDecimal originalPrice,
        String thumbnailUrl,
        String bannerUrl,
        List<CourseFaqResponse> faqs,
        boolean isWishlisted
) {}
