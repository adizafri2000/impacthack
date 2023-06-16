package com.impacthack.backend1.controller;

import com.impacthack.backend1.model.CashFlowRecord;
import com.impacthack.backend1.repository.CashFlowRecordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;

@RestController
public class AppController {
    private final CashFlowRecordRepository cashFlowRecordRepository;

    public AppController(CashFlowRecordRepository cashFlowRecordRepository){
        this.cashFlowRecordRepository = cashFlowRecordRepository;
    }

    @GetMapping("/api/{id}")
    public ResponseEntity<CashFlowRecord> showCashFlowRecord(@PathVariable Integer id){

        return new ResponseEntity<>(cashFlowRecordRepository.findById(id).orElse(null), HttpStatus.OK);
    }
}
