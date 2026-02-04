package com.restaurant.controller;

import com.restaurant.dto.AdminStatsDTO;
import com.restaurant.model.Order;
import com.restaurant.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getDashboardStats() {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIDNIGHT);

        long totalOrdersToday = orderRepository.countByOrderDateAfter(startOfDay);
        long pendingOrders = orderRepository.countByStatus(Order.OrderStatus.PENDING);
        BigDecimal totalRevenue = orderRepository.sumTotalAmount();

        // Mock data for values not yet implemented in DB
        int activeTables = 8;
        double averageRating = 4.6;
        long totalReviews = 1234;
        long customerFeedbackCount = 85;

        AdminStatsDTO stats = new AdminStatsDTO(
                totalOrdersToday,
                pendingOrders,
                totalRevenue,
                activeTables,
                averageRating,
                totalReviews,
                customerFeedbackCount);

        return ResponseEntity.ok(stats);
    }
}
