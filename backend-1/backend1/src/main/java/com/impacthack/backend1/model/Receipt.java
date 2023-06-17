package com.impacthack.backend1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "receipt")
public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "date_of_purchase")
    private Date dateOfPurchase;

    private Time time;

    private String merchant;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "outflow_category")
    private String outflowCategory;

    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp createdAt;

    @OneToMany
    @JoinColumn(name = "receipt_id",referencedColumnName = "id")
    private List<Purchase> purchaseList;

}
