package com.impacthack.backend1.dto;

public record PurchaseDTO(
        String item,
        Integer quantity,
        Double unitPrice,
        Integer receiptId
) {}
