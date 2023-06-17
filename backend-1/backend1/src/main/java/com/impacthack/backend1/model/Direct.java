package com.impacthack.backend1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "direct")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Direct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String category;
    private String unit;
    private Integer quantity;
    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "cashflow_id")
    private Integer cashFlowId;

    @Column(name = "receipt_id")
    private Integer receiptId;

    @Column(updatable = false,insertable = false)
    private Double price;
}
