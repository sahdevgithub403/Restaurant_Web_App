package com.restaurant.controller;

import com.restaurant.dto.PaymentRequest;
import com.restaurant.service.PaymentService;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5174") // Adjust for frontend URL
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(@RequestBody PaymentRequest paymentRequest) {
        System.out.println("🔥 Payment controller reached");
        try {
            String order = paymentService.createOrder(paymentRequest.getAmount(), paymentRequest.getCurrency());
            return ResponseEntity.ok(order);
        } catch (RazorpayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating Razorpay order: " + e.getMessage());
        }
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(
            @RequestBody com.restaurant.dto.PaymentVerificationRequest verificationRequest) {
        try {
            boolean isValid = paymentService.verifyPayment(
                    verificationRequest.getRazorpayOrderId(),
                    verificationRequest.getRazorpayPaymentId(),
                    verificationRequest.getRazorpaySignature());

            if (isValid) {
                return ResponseEntity.ok().body("{\"verified\": true}");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("{\"verified\": false, \"message\": \"Invalid signature\"}");
            }
        } catch (RazorpayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error verifying payment: " + e.getMessage());
        }
    }
}