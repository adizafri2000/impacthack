/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.impacthack.backend2.backend2.repository;

import com.impacthack.backend2.backend2.model.InFlow;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author TM39586
 */
@Repository
public interface InFlowRepository extends JpaRepository<InFlow, Integer>{

    public List<InFlow> findByCreatedAtBetween(Date startOfMonth, Date endOfMonth);
    
}
