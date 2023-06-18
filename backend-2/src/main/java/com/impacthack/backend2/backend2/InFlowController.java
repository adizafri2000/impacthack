/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.impacthack.backend2.backend2;

import com.impacthack.backend2.backend2.dto.InFlowCollectionDto;
import com.impacthack.backend2.backend2.model.InFlow;
import com.impacthack.backend2.backend2.repository.InFlowRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author TM39586
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class InFlowController {
    
    private final InFlowRepository inFlowRepository;
        
    public InFlowController(InFlowRepository inFlowRepository){
        this.inFlowRepository = inFlowRepository;
    }
    
    @GetMapping("inflow")
    public ResponseEntity<InFlow> getInFlow(@RequestParam Integer id){
        return new ResponseEntity<>(inFlowRepository.findById(id).orElse(null), HttpStatus.OK);
    }
    
    @GetMapping("inflows")
    public ResponseEntity<InFlowCollectionDto>  getAllInFlows(){
        List<InFlow> inflows = inFlowRepository.findAll();
        return new ResponseEntity<>(new InFlowCollectionDto(inflows), HttpStatus.OK);
    }
    
    @PostMapping(path="inflow")
    public InFlow insertInFlow(@RequestBody InFlow inFlow){
        InFlow res  = inFlowRepository.save(inFlow);
        return res;
    }
    
    @GetMapping("inflow/month")
    public ResponseEntity<InFlowCollectionDto> getInflowByMonth(@RequestParam("month") String createdAt){
        // Convert the month string to a Date object
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM");
        Date parsedMonth;
        try {
            parsedMonth = dateFormat.parse(createdAt);
        } catch (ParseException e) {
            // Handle parsing exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // Get the start and end of the month
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(parsedMonth);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        Date startOfMonth = calendar.getTime();
        calendar.add(Calendar.MONTH, 1);
        calendar.add(Calendar.DATE, -1);
        Date endOfMonth = calendar.getTime();
        
        List<InFlow> inflows = inFlowRepository.findByCreatedAtBetween(startOfMonth, endOfMonth);
        return new ResponseEntity<>(new InFlowCollectionDto(inflows), HttpStatus.OK);
    }
    
}
