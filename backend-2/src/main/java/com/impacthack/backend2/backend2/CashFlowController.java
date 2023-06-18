/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.impacthack.backend2.backend2;

import com.impacthack.backend2.backend2.dto.CashFlowRecordCollectionDto;
import com.impacthack.backend2.backend2.model.CashFlowRecord;
import com.impacthack.backend2.backend2.repository.CashFlowRecordRepository;
import java.util.Date;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author TM39586
 */
@RestController
@CrossOrigin
@RequestMapping("/")
public class CashFlowController {
    
    private final CashFlowRecordRepository cashFlowRecordRepository;
    
    public CashFlowController(CashFlowRecordRepository cashFlowRecordRepository){
        this.cashFlowRecordRepository = cashFlowRecordRepository;
    }
    
    
    @GetMapping("cashflow")
    public ResponseEntity<CashFlowRecord> getCashFlow(@RequestParam Integer id){
        return new ResponseEntity<>(cashFlowRecordRepository.findById(id).orElse(null), HttpStatus.OK);
    }
    
    @GetMapping("cashflows")
    public ResponseEntity<CashFlowRecordCollectionDto>  getAllCashFlows(){
        List<CashFlowRecord> cashFlows = cashFlowRecordRepository.findAll();
        return new ResponseEntity<>(new CashFlowRecordCollectionDto(cashFlows), HttpStatus.OK);
    }
    
    @GetMapping("cashflows/month")
    public ResponseEntity<CashFlowRecord> getCashFlowByMonth(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date month){
        return new ResponseEntity<>(cashFlowRecordRepository.findByMonth(month), HttpStatus.OK);
    }
    
    
    
}
