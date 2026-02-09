package com.restaurant.repository;

import com.restaurant.model.RestaurantStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantStatusRepository extends JpaRepository<RestaurantStatus, Long> {
    Optional<RestaurantStatus> findById(Long id);
}
