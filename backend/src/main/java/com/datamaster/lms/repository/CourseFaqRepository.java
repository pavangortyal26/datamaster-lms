package com.datamaster.lms.repository;

import com.datamaster.lms.entity.CourseFaq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CourseFaqRepository extends JpaRepository<CourseFaq, UUID> {
    List<CourseFaq> findAllByCourseIdOrderBySortOrderAsc(UUID courseId);
}
