package com.example.imagemPecas.infra.repository.specs;

import org.springframework.data.jpa.domain.Specification;

public class GenericSpecs {

    private GenericSpecs(){}

    // Equivale ao "WHERE 1 = 1": ponto de partida neutro, reutilizável para qualquer entidade (<T>)
    public static <T> Specification<T> conjunction(){
        return (root, q, criteriaBuilder) -> criteriaBuilder.conjunction();
    }
}
