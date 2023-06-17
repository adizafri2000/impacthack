package com.impacthack.backend1.dto;

import com.impacthack.backend1.model.Receipt;

import java.util.List;
import java.util.Optional;

public record ReceiptCollectionDTO(List<Receipt> receiptList) {
}
