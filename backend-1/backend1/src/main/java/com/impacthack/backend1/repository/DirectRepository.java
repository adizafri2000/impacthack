package com.impacthack.backend1.repository;

import com.impacthack.backend1.model.Direct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectRepository extends JpaRepository<Direct, Integer> {
}
