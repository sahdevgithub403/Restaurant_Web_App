package com.restaurant.controller;

import com.restaurant.dto.AdminStatsDTO;
import com.restaurant.model.Order;
import com.restaurant.model.User;
import com.restaurant.repository.OrderRepository;
import com.restaurant.repository.UserRepository;
import com.restaurant.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private AdminDashboardService adminDashboardService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/my")
    public List<Order> getMyOrders(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByOrderDateDesc(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id, Authentication authentication) {
        return orderRepository.findById(id)
                .map(order -> {
                    if (order.getUser().getUsername().equals(authentication.getName()) ||
                            authentication.getAuthorities().stream()
                                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                        return ResponseEntity.ok(order);
                    }
                    return ResponseEntity.status(403).<Order>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Order createOrder(@Valid @RequestBody Order order, Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);

        if (order.getOrderItems() != null) {
            for (com.restaurant.model.OrderItem item : order.getOrderItems()) {
                item.setOrder(order);
            }
        }

        Order savedOrder = orderRepository.save(order);
        messagingTemplate.convertAndSend("/topic/orders", savedOrder);
        messagingTemplate.convertAndSend("/topic/admin/stats", adminDashboardService.getStats());
        return savedOrder;
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody Order.OrderStatus status) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(status);
                    Order updatedOrder = orderRepository.save(order);
                    messagingTemplate.convertAndSend("/topic/orders", updatedOrder);
                    messagingTemplate.convertAndSend("/topic/admin/stats", adminDashboardService.getStats());
                    messagingTemplate.convertAndSend("/topic/order-status/" + order.getUser().getId(), updatedOrder);
                    return ResponseEntity.ok(updatedOrder);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}