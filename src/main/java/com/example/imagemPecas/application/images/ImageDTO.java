package com.example.imagemPecas.application.images;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Formato exposto pela API: só os dados que interessam a quem consome.
 * Nunca inclui o array de bytes da imagem (campo "file" da entidade);
 * a imagem é acessada pela URL.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDTO {
    private String extension;
    private String name;
    private Long size;
    private LocalDate uploadDate;
    private String url;
}
