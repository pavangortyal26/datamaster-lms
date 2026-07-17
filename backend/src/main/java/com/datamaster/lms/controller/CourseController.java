package com.datamaster.lms.controller;

import com.datamaster.lms.dto.response.CourseCategoryResponse;
import com.datamaster.lms.dto.response.CourseDetailResponse;
import com.datamaster.lms.dto.response.CourseSummaryResponse;
import com.datamaster.lms.entity.User;
import com.datamaster.lms.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses/public")
@RequiredArgsConstructor
@Tag(name = "Courses", description = "Public course catalog browsing")
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    @Operation(summary = "List published courses with optional category/level/search filters and sorting")
    public ResponseEntity<List<CourseSummaryResponse>> listCourses(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "POPULAR") CourseService.SortOption sort,
            @AuthenticationPrincipal User currentUser
    ) {
        var userId = currentUser != null ? currentUser.getId() : null;
        return ResponseEntity.ok(courseService.listCourses(category, level, search, sort, userId));
    }

    @GetMapping("/categories")
    @Operation(summary = "List all course categories")
    public ResponseEntity<List<CourseCategoryResponse>> listCategories() {
        return ResponseEntity.ok(courseService.listCategories());
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get full course detail by slug")
    public ResponseEntity<CourseDetailResponse> getCourse(
            @PathVariable String slug,
            @AuthenticationPrincipal User currentUser
    ) {
        var userId = currentUser != null ? currentUser.getId() : null;
        return ResponseEntity.ok(courseService.getCourseBySlug(slug, userId));
    }
}
