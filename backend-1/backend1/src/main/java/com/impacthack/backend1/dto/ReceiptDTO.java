package com.impacthack.backend1.dto;

import jakarta.persistence.Column;

import java.sql.Date;
import java.sql.Time;

public record ReceiptDTO(String merchant,Date dateOfPurchase,Time time,Double totalPrice,String outflowCategory) {
}
