/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.impacthack.backend2.backend2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author TM39586
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "inflow")
public class InFlow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String category;
    private Double amount;
    
    @Column(name = "created_at")
    private Date createdAt;
    
    @PrePersist
    private void onCreate(){
        createdAt = new Date();
    }
    
    @Column(name = "cashflow_id")
    private Integer cashFlowId;

    
}
