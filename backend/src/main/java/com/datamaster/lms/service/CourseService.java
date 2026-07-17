package com.datamaster.lms.service;

import com.datamaster.lms.dto.response.CourseCategoryResponse;
import com.datamaster.lms.dto.response.CourseDetailResponse;
import com.datamaster.lms.dto.response.CourseFaqResponse;
import com.datamaster.lms.dto.response.CourseSummaryResponse;
import com.datamaster.lms.entity.Course;
import com.datamaster.lms.exception.ResourceNotFoundException;
import com.datamaster.lms.repository.CourseCategoryRepository;
import com.datamaster.lms.repository.CourseFaqRepository;
import com.datamaster.lms.repository.CourseRepository;
import com.datamaster.lms.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseFaqRepository courseFaqRepository;
    private final CourseCategoryRepository courseCategoryRepository;
    private final WishlistRepository wishlistRepository;

    public enum SortOption {
        POPULAR, PRICE_LOW, PRICE_HIGH, RATING
    }

    @Transactional(readOnly = true)
    public List<CourseSummaryResponse> listCourses(
            String category, String level, String search, SortOption sort, UUID currentUserId) {

        Set<UUID> wishlistedCourseIds = wishlistedCourseIds(currentUserId);

        List<Course> courses = courseRepository.findAllByIsPublishedTrue().stream()
                .filter(c -> category == null || category.isBlank()
                        || c.getCategory().getSlug().equalsIgnoreCase(category))
                .filter(c -> level == null || level.isBlank()
                        || c.getLevel().name().equalsIgnoreCase(level))
                .filter(c -> search == null || search.isBlank()
                        || c.getTitle().toLowerCase().contains(search.toLowerCase())
                        || c.getDescription().toLowerCase().contains(search.toLowerCase()))
                .collect(Collectors.toList());

        Comparator<Course> comparator = switch (sort == null ? SortOption.POPULAR : sort) {
            case PRICE_LOW -> Comparator.comparing(Course::getPrice);
            case PRICE_HIGH -> Comparator.comparing(Course::getPrice).reversed();
            case RATING -> Comparator.comparing(Course::getRating).reversed();
            case POPULAR -> Comparator.comparing(Course::getStudentsCount).reversed();
        };
        courses.sort(comparator);

        return courses.stream()
                .map(c -> toSummary(c, wishlistedCourseIds.contains(c.getId())))
                .toList();
    }

    @Transactional(readOnly = true)
    public CourseDetailResponse getCourseBySlug(String slug, UUID currentUserId) {
        Course course = courseRepository.findBySlugAndIsPublishedTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + slug));

        List<CourseFaqResponse> faqs = courseFaqRepository
                .findAllByCourseIdOrderBySortOrderAsc(course.getId()).stream()
                .map(f -> new CourseFaqResponse(f.getQuestion(), f.getAnswer()))
                .toList();

        boolean isWishlisted = currentUserId != null
                && wishlistRepository.existsByUserIdAndCourseId(currentUserId, course.getId());

        return new CourseDetailResponse(
                course.getId(), course.getSlug(), course.getTitle(), course.getCategory().getName(),
                course.getDescription(), course.getLearningOutcomes(), course.getSkills(),
                course.getInstructorName(), course.getInstructorBio(), course.getDuration(),
                course.getLevel().name(), course.getRating(), course.getStudentsCount(),
                course.getPrice(), course.getOriginalPrice(), course.getThumbnailUrl(),
                course.getBannerUrl(), faqs, isWishlisted
        );
    }

    @Transactional(readOnly = true)
    public List<CourseCategoryResponse> listCategories() {
        return courseCategoryRepository.findAll().stream()
                .map(cat -> new CourseCategoryResponse(cat.getName(), cat.getSlug()))
                .toList();
    }

    private Set<UUID> wishlistedCourseIds(UUID currentUserId) {
        if (currentUserId == null) return Set.of();
        return wishlistRepository.findAllByUserId(currentUserId).stream()
                .map(w -> w.getCourse().getId())
                .collect(Collectors.toSet());
    }

    private CourseSummaryResponse toSummary(Course c, boolean isWishlisted) {
        return new CourseSummaryResponse(
                c.getId(), c.getSlug(), c.getTitle(), c.getCategory().getName(), c.getDescription(),
                c.getDuration(), c.getLevel().name(), c.getInstructorName(), c.getRating(),
                c.getStudentsCount(), c.getPrice(), c.getOriginalPrice(), c.getThumbnailUrl(),
                isWishlisted
        );
    }
}
