package com.impacthack.backend1.dto;

import jakarta.persistence.Column;

public record DirectDTO(
        String category,
        String unit,
        Integer quantity,
        Double unitPrice,
        Integer cashFlowId
) {
}
