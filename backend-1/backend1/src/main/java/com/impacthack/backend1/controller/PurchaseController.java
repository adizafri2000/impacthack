package com.impacthack.backend1.controller;

import com.impacthack.backend1.dto.PurchaseCollectionDTO;
import com.impacthack.backend1.dto.PurchaseDTO;
import com.impacthack.backend1.model.Purchase;
import com.impacthack.backend1.repository.PurchaseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {
    private final static Logger log = Logger.getLogger(PurchaseController.class.getName());
    private final PurchaseRepository purchaseRepository;

    public PurchaseController(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOnePurchase(@PathVariable Integer id){
        Purchase purchase;
        try{
            purchase = purchaseRepository.findById(id).orElse(null);
        }
        catch (Exception e){
            log.severe(e.getMessage());
            return new ResponseEntity<>("Service error",HttpStatus.SERVICE_UNAVAILABLE);
        }
        if(purchase==null)
            return new ResponseEntity<>("No purchase data found for ID="+id.toString(),HttpStatus.NOT_FOUND);
        return new ResponseEntity<Purchase>(purchaseRepository.findById(id).orElse(null), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllPurchase(){
        PurchaseCollectionDTO purchase;
        try{
            purchase = new PurchaseCollectionDTO(purchaseRepository.findAll());
        }
        catch (Exception e){
            log.severe(e.getMessage());
            return new ResponseEntity<>("Service error",HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity<PurchaseCollectionDTO>(purchase, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<String> postOneToDB(@RequestBody PurchaseDTO purchaseDTO){
        Purchase purchase = new Purchase();

        try {
            purchase.setItem(purchaseDTO.item());
            purchase.setQuantity(purchaseDTO.quantity());
            purchase.setUnitPrice(purchaseDTO.unitPrice());
            purchase.setReceiptId(purchaseDTO.receiptId());
        } catch (Exception e){
            log.severe(e.getMessage());
            return new ResponseEntity<>("Post data error",
                    HttpStatus.BAD_REQUEST);
        }
        finally {
            try{
                purchaseRepository.save(purchase);
            } catch (Exception e){
                log.severe(e.getMessage());
                return new ResponseEntity<>("Service error", HttpStatus.SERVICE_UNAVAILABLE);
            }
        }
        return new ResponseEntity<>("Success",HttpStatus.CREATED);
    }
}
