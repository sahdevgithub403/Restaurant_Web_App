package com.restaurant.repository;

import com.restaurant.model.Order;
import com.restaurant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);

    List<Order> findByStatus(Order.OrderStatus status);

    List<Order> findByUserOrderByOrderDateDesc(User user);

    long countByOrderDateAfter(LocalDateTime date);

    long countByStatus(Order.OrderStatus status);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status != 'CANCELLED'")
    BigDecimal sumTotalAmount();
}