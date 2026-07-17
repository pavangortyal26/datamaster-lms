package com.datamaster.lms.service;

import com.datamaster.lms.dto.response.CourseSummaryResponse;
import com.datamaster.lms.entity.Course;
import com.datamaster.lms.entity.User;
import com.datamaster.lms.entity.Wishlist;
import com.datamaster.lms.exception.ResourceNotFoundException;
import com.datamaster.lms.repository.CourseRepository;
import com.datamaster.lms.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final CourseRepository courseRepository;

    /** Toggles wishlist membership for the given course. Returns true if now wishlisted, false if removed. */
    @Transactional
    public boolean toggle(User user, UUID courseId) {
        var existing = wishlistRepository.findByUserIdAndCourseId(user.getId(), courseId);
        if (existing.isPresent()) {
            wishlistRepository.delete(existing.get());
            return false;
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        wishlistRepository.save(Wishlist.builder().user(user).course(course).build());
        return true;
    }

    @Transactional(readOnly = true)
    public List<CourseSummaryResponse> listForUser(User user) {
        return wishlistRepository.findAllByUserId(user.getId()).stream()
                .map(w -> toSummary(w.getCourse()))
                .toList();
    }

    private CourseSummaryResponse toSummary(Course c) {
        return new CourseSummaryResponse(
                c.getId(), c.getSlug(), c.getTitle(), c.getCategory().getName(), c.getDescription(),
                c.getDuration(), c.getLevel().name(), c.getInstructorName(), c.getRating(),
                c.getStudentsCount(), c.getPrice(), c.getOriginalPrice(), c.getThumbnailUrl(),
                true
        );
    }
}
