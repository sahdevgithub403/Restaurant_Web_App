package com.restaurant.controller;

import com.restaurant.model.RestaurantStatus;
import com.restaurant.repository.RestaurantStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/restaurant-status")
public class RestaurantStatusController {

    @Autowired
    private RestaurantStatusRepository restaurantStatusRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public RestaurantStatus getStatus() {
        return restaurantStatusRepository.findById(1L)
                .orElseGet(() -> {
                    RestaurantStatus defaultStatus = new RestaurantStatus();
                    defaultStatus.setId(1L);
                    return restaurantStatusRepository.save(defaultStatus);
                });
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public RestaurantStatus updateStatus(@RequestBody RestaurantStatus newStatus) {
        RestaurantStatus status = restaurantStatusRepository.findById(1L)
                .orElseGet(() -> {
                    RestaurantStatus s = new RestaurantStatus();
                    s.setId(1L);
                    return s;
                });

        status.setOpen(newStatus.isOpen());
        status.setStatusMessage(newStatus.getStatusMessage());
        status.setEstimatedWaitTime(newStatus.getEstimatedWaitTime());

        RestaurantStatus updated = restaurantStatusRepository.save(status);

        // Notify all clients of status change
        messagingTemplate.convertAndSend("/topic/restaurant-status", updated);

        return updated;
    }
}
