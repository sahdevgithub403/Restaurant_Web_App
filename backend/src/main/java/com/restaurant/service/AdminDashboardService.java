package com.restaurant.service;

import com.restaurant.dto.AdminStatsDTO;
import com.restaurant.model.Order;
import com.restaurant.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
public class AdminDashboardService {

    @Autowired
    private OrderRepository orderRepository;

    public AdminStatsDTO getStats() {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIDNIGHT);

        long totalOrdersToday = orderRepository.countByOrderDateAfter(startOfDay);
        long pendingOrders = orderRepository.countByStatus(Order.OrderStatus.PENDING);
        BigDecimal totalRevenue = orderRepository.sumTotalAmount();

        // Standard mock values as used in the controller
        int activeTables = 8;
        double averageRating = 4.6;
        long totalReviews = 1234;
        long customerFeedbackCount = 85;

        return new AdminStatsDTO(
                totalOrdersToday,
                pendingOrders,
                totalRevenue,
                activeTables,
                averageRating,
                totalReviews,
                customerFeedbackCount);
    }
}
