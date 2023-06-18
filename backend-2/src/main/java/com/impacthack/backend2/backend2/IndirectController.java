/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.impacthack.backend2.backend2;

import com.impacthack.backend2.backend2.dto.IndirectDto;
import com.impacthack.backend2.backend2.model.Indirect;
import com.impacthack.backend2.backend2.repository.IndirectRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
@CrossOrigin
@RequestMapping("/")
public class IndirectController {
    private final IndirectRepository indirectRepository;
    
    public IndirectController(IndirectRepository indirectRepository){
        this.indirectRepository = indirectRepository;
    }
    
    @GetMapping("/indirect")
    public ResponseEntity<Indirect> getIndirect(@RequestParam Integer id){
        return new ResponseEntity<>(indirectRepository.findById(id).orElse(null),HttpStatus.OK);
    }
    
    @GetMapping("/indirects")
    public ResponseEntity<IndirectDto> getAllIndirect(){
        List<Indirect> indirects = indirectRepository.findAll();
        return new ResponseEntity<>(new IndirectDto(indirects),HttpStatus.OK);
    }
    
    @PostMapping(path="/indirect")
    public Indirect insertIndirect(@RequestBody Indirect indirect){
        Indirect res = indirectRepository.save(indirect);
        return res;
    }
    
    @GetMapping("indirect/category")
    public ResponseEntity<IndirectDto> getIndirectByCategory(@RequestParam String category){
        List<Indirect> list = indirectRepository.findByCategory(category);
        return new ResponseEntity<>(new IndirectDto(list), HttpStatus.OK);
    }
    
    @GetMapping("indirect/cashflowid")
    public ResponseEntity<IndirectDto> getIndirectByCashFlowId(@RequestParam Integer cashflowid){
        List<Indirect> list = indirectRepository.findByCashFlowId(cashflowid);
        return new ResponseEntity<>(new IndirectDto(list), HttpStatus.OK);
    }

    
    
    
}
