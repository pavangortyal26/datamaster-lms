package com.datamaster.lms.repository;

import com.datamaster.lms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    Optional<Course> findBySlugAndIsPublishedTrue(String slug);
    List<Course> findAllByIsPublishedTrue();
}
