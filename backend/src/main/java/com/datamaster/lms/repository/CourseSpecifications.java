package com.datamaster.lms.repository;

import com.datamaster.lms.entity.Course;
import org.springframework.data.jpa.domain.Specification;

public class CourseSpecifications {

    private CourseSpecifications() {}

    public static Specification<Course> isPublished() {
        return (root, query, cb) -> cb.isTrue(root.get("isPublished"));
    }

    public static Specification<Course> hasCategorySlug(String categorySlug) {
        return (root, query, cb) -> {
            if (categorySlug == null || categorySlug.isBlank()) return cb.conjunction();
            return cb.equal(root.get("category").get("slug"), categorySlug);
        };
    }

    public static Specification<Course> hasLevel(String level) {
        return (root, query, cb) -> {
            if (level == null || level.isBlank()) return cb.conjunction();
            return cb.equal(root.get("level").as(String.class), level);
        };
    }

    public static Specification<Course> matchesSearch(String search) {
        return (root, query, cb) -> {
            if (search == null || search.isBlank()) return cb.conjunction();
            String pattern = "%" + search.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("title")), pattern),
                    cb.like(cb.lower(root.get("shortDescription")), pattern),
                    cb.like(cb.lower(root.get("instructorName")), pattern)
            );
        };
    }
}
