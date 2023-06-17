package com.impacthack.backend1.dto;

import com.impacthack.backend1.model.Purchase;

import java.util.List;

public record PurchaseCollectionDTO(List<Purchase> purchaseList) {
}
