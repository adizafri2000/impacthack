package com.impacthack.backend1.controller;

import com.impacthack.backend1.dto.ReceiptCollectionDTO;
import com.impacthack.backend1.dto.ReceiptDTO;
import com.impacthack.backend1.model.Purchase;
import com.impacthack.backend1.model.Receipt;
import com.impacthack.backend1.repository.ReceiptRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/receipts")
public class ReceiptController {
    private static final Logger log = Logger.getLogger(ReceiptController.class.getName());
    private final ReceiptRepository receiptRepository;

    public ReceiptController(ReceiptRepository receiptRepository){
        this.receiptRepository = receiptRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllReceipts(
            @RequestParam(required = false) Optional<Date> from,
            @RequestParam(required = false) Optional<Date> until,
            @RequestParam(required = false) Optional<String> outflowCategory
            ){
        List<Receipt> receiptList;
        try{
            receiptList = receiptRepository.findAll();

            if(outflowCategory.isPresent())
                receiptList = receiptList
                        .stream()
                        .filter(receipt -> receipt.getOutflowCategory().equals(outflowCategory.get()))
                        .collect(Collectors.toList());

            if(from.isPresent())
                receiptList = receiptList
                        .stream()
                        .filter(receipt -> receipt.getDateOfPurchase().after(from.get()))
                        .collect(Collectors.toList());

            if(until.isPresent())
                receiptList = receiptList
                        .stream()
                        .filter(receipt -> receipt.getDateOfPurchase().before(until.get()))
                        .collect(Collectors.toList());
            } catch (Exception e){
            log.severe(e.getMessage());
            return new ResponseEntity<>("Service error",HttpStatus.SERVICE_UNAVAILABLE);
        }
        log.info("Fetched "+receiptList.size()+" receipt records");
        return new ResponseEntity<ReceiptCollectionDTO>(new ReceiptCollectionDTO(receiptList), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneReceiptById(@PathVariable Integer id){
        Receipt receipt;
        try{
            receipt = receiptRepository.findById(id).orElse(null);
        }
        catch (Exception e){
            log.severe(e.getMessage());
            return new ResponseEntity<>("Service error",HttpStatus.SERVICE_UNAVAILABLE);
        }
        if(receipt==null)
            return new ResponseEntity<>("No receipt data found for ID="+id.toString(),HttpStatus.NOT_FOUND);
        return new ResponseEntity<Receipt>(receiptRepository.findById(id).orElse(null), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<String> postOneToDB(@RequestBody ReceiptDTO receiptDTO){
        Receipt receipt = new Receipt();

        try {
            receipt.setMerchant(receiptDTO.merchant());
            receipt.setTime(receiptDTO.time());
            receipt.setDateOfPurchase(receiptDTO.dateOfPurchase());
            receipt.setTotalPrice(receiptDTO.totalPrice());
            receipt.setOutflowCategory(receiptDTO.outflowCategory());
        } catch (Exception e){
            log.severe(e.getMessage());
            return new ResponseEntity<>("Post data error. Make sure to post as Content-Type: application/json with the body in format:" +
                    "{" +
                    "  \"merchant\": (merchant name in quotes)," +
                    "  \"dateOfPurchase\" : (date in format YYYY-MM-DD in quotes)," +
                    "  \"time\": (time on format HH:MM:SS in quotes)," +
                    "  \"totalPrice\": (integer/decimal number)," +
                    "  \"outflowCategory\": (name of category in quotes)" +
                    "}",
                    HttpStatus.BAD_REQUEST);
        }
        finally {
            try{
                receiptRepository.save(receipt);
            } catch (Exception e){
                log.severe(e.getMessage());
                return new ResponseEntity<>("Service error", HttpStatus.SERVICE_UNAVAILABLE);
            }
        }
        return new ResponseEntity<>("Success",HttpStatus.CREATED);
    }


}
