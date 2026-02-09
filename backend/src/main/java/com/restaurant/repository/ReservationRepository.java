package com.restaurant.repository;

import com.restaurant.model.Reservation;
import com.restaurant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.time.LocalDate;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);

    List<Reservation> findByDate(LocalDate date);

    List<Reservation> findByStatus(Reservation.ReservationStatus status);
}
