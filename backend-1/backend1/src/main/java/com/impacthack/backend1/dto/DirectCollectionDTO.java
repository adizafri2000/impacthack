package com.impacthack.backend1.dto;

import com.impacthack.backend1.model.Direct;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

public record DirectCollectionDTO(
        List<Direct> directList
) {
}
