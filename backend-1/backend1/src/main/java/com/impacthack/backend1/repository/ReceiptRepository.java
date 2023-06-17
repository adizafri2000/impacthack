package com.impacthack.backend1.repository;

import com.impacthack.backend1.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt,Integer> {
}
