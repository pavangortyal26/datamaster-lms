package com.datamaster.lms.repository;

import com.datamaster.lms.entity.CourseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CourseCategoryRepository extends JpaRepository<CourseCategory, UUID> {
    Optional<CourseCategory> findBySlug(String slug);
}
