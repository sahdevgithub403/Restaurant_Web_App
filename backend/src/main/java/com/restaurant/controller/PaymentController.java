package com.restaurant.controller;

import com.restaurant.model.Order;
import com.restaurant.model.Payment;
import com.restaurant.model.User;
import com.restaurant.repository.OrderRepository;
import com.restaurant.repository.PaymentRepository;
import com.restaurant.repository.UserRepository;
import com.restaurant.service.RazorpayService;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> request) {
        try {
            Long amount = Long.valueOf(request.get("amount").toString());
            String currency = request.get("currency").toString();

            Map<String, String> razorpayOrder = razorpayService.createOrder(amount, currency);
            return ResponseEntity.ok(razorpayOrder);
        } catch (RazorpayException e) {
            return ResponseEntity.badRequest().body("Error creating Razorpay order: " + e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, Object> request, Authentication authentication) {
        try {
            String razorpayOrderId = (String) request.get("razorpay_order_id");
            String razorpayPaymentId = (String) request.get("razorpay_payment_id");
            String razorpaySignature = (String) request.get("razorpay_signature");
            Map<String, Object> orderData = (Map<String, Object>) request.get("orderData");

            boolean isValid = razorpayService.verifyPaymentSignature(razorpayOrderId, razorpayPaymentId,
                    razorpaySignature);

            if (!isValid) {
                return ResponseEntity.badRequest().body("Invalid payment signature");
            }

            // Create order
            Order order = new Order();
            if (orderData.containsKey("deliveryAddress")) {
                order.setDeliveryAddress((String) orderData.get("deliveryAddress"));
            }
            if (orderData.containsKey("phoneNumber")) {
                order.setPhoneNumber((String) orderData.get("phoneNumber"));
            }
            if (orderData.containsKey("latitude") && orderData.get("latitude") != null) {
                order.setLatitude(((Number) orderData.get("latitude")).doubleValue());
            }
            if (orderData.containsKey("longitude") && orderData.get("longitude") != null) {
                order.setLongitude(((Number) orderData.get("longitude")).doubleValue());
            }
            if (orderData.containsKey("totalAmount")) {
                order.setTotalAmount(new BigDecimal(orderData.get("totalAmount").toString()));
            }

            User user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            order.setUser(user);
            order.setStatus(Order.OrderStatus.CONFIRMED);

            Order savedOrder = orderRepository.save(order);

            // Create payment record
            Payment payment = new Payment();
            payment.setOrder(savedOrder);
            payment.setAmount(savedOrder.getTotalAmount());
            payment.setStatus(Payment.PaymentStatus.COMPLETED);
            payment.setPaymentMethod(Payment.PaymentMethod.RAZORPAY);
            payment.setTransactionId(razorpayPaymentId);
            payment.setRazorpayOrderId(razorpayOrderId);

            paymentRepository.save(payment);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("orderId", savedOrder.getId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error verifying payment: " + e.getMessage());
        }
    }
}