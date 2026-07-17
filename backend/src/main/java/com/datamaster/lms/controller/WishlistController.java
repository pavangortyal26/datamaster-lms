package com.datamaster.lms.controller;

import com.datamaster.lms.dto.response.CourseSummaryResponse;
import com.datamaster.lms.entity.User;
import com.datamaster.lms.service.WishlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/wishlist")
@RequiredArgsConstructor
@Tag(name = "Wishlist", description = "Save courses for later (requires login)")
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    @Operation(summary = "List the current user's wishlisted courses")
    public ResponseEntity<List<CourseSummaryResponse>> list(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(wishlistService.listForUser(currentUser));
    }

    @PostMapping("/{courseId}")
    @Operation(summary = "Toggle a course's wishlist membership")
    public ResponseEntity<Map<String, Boolean>> toggle(
            @PathVariable UUID courseId,
            @AuthenticationPrincipal User currentUser
    ) {
        boolean isWishlisted = wishlistService.toggle(currentUser, courseId);
        return ResponseEntity.ok(Map.of("isWishlisted", isWishlisted));
    }
}
