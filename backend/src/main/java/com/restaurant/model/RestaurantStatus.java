package com.restaurant.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "restaurant_status")
public class RestaurantStatus {

    @Id
    private Long id = 1L; // Singleton entity

    private boolean isOpen;
    private String statusMessage; // e.g., "Closed for maintenance", "We are currently experiencing high volume"
    private String estimatedWaitTime; // e.g., "30-45 mins"

    // Default constructor
    public RestaurantStatus() {
        this.isOpen = true; // Default open
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isOpen() {
        return isOpen;
    }

    public void setOpen(boolean open) {
        isOpen = open;
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }

    public String getEstimatedWaitTime() {
        return estimatedWaitTime;
    }

    public void setEstimatedWaitTime(String estimatedWaitTime) {
        this.estimatedWaitTime = estimatedWaitTime;
    }
}
