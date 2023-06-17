package com.impacthack.backend1.controller;

import com.impacthack.backend1.dto.DirectCollectionDTO;
import com.impacthack.backend1.dto.DirectDTO;
import com.impacthack.backend1.model.Direct;
import com.impacthack.backend1.model.Purchase;
import com.impacthack.backend1.repository.DirectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/direct")
public class DirectContoller {
    private final static Logger log = Logger.getLogger(DirectContoller.class.getName());
    private final DirectRepository directRepository;

    public DirectContoller(DirectRepository directRepository) {
        this.directRepository = directRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllDirect(){
        return new ResponseEntity<DirectCollectionDTO>(new DirectCollectionDTO(directRepository.findAll()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDirectById(@PathVariable Integer id){
        Direct direct = directRepository.findById(id).orElse(null);
        if(direct==null)
            return new ResponseEntity<>("No direct outflow data found for ID="+id.toString(),HttpStatus.NOT_FOUND);
        return new ResponseEntity<Direct>(direct, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<String> postToDB(@RequestBody DirectDTO directDTO){
        Direct direct = new Direct();

        try {
            direct.setCategory(directDTO.category());
            direct.setUnit(directDTO.unit());
            direct.setQuantity(directDTO.quantity());
            direct.setUnitPrice(directDTO.unitPrice());
            direct.setCashFlowId(directDTO.cashFlowId());
        } catch (Exception e){
            log.severe(e.getMessage());
            return new ResponseEntity<>("Post data error",
                    HttpStatus.BAD_REQUEST);
        }
        finally {
            try{
                directRepository.save(direct);
            } catch (Exception e){
                log.severe(e.getMessage());
                return new ResponseEntity<>("Service error", HttpStatus.SERVICE_UNAVAILABLE);
            }
        }
        return new ResponseEntity<>("Success",HttpStatus.CREATED);
    }
}
