package com.impacthack.backend1.repository;

import com.impacthack.backend1.model.CashFlowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CashFlowRecordRepository extends JpaRepository<CashFlowRecord,Integer> {

}
