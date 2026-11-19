package com.example.imagemPecas;

import com.example.imagemPecas.infra.repository.ImageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ImageFlowTests {
    @Autowired MockMvc mvc;
    @Autowired ImageRepository repository;

    @BeforeEach
    void clearImages() { repository.deleteAll(); }

    @Test
    void uploadSearchAndDownload() throws Exception {
        byte[] bytes = {1, 2, 3};
        String location = mvc.perform(multipart("/v1/images")
                .file(new MockMultipartFile("file", "peca.jpg", "image/jpeg", bytes))
                .param("name", "Placa mãe").param("tags", "computador,peças"))
                .andExpect(status().isCreated()).andReturn().getResponse().getHeader("Location");

        mvc.perform(get("/v1/images").param("query", "PLACA").param("extension", "JPEG"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].extension").value("JPEG"))
                .andExpect(jsonPath("$[0].size").value(3))
                .andExpect(jsonPath("$[0].uploadDate").value(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))));
        mvc.perform(get("/v1/images").param("query", "computador").param("extension", "JPG"))
                .andExpect(jsonPath("$.length()").value(1));
        mvc.perform(get("/v1/images").param("query", "PLACA").param("extension", "PNG"))
                .andExpect(jsonPath("$.length()").value(0));
        mvc.perform(get("/v1/images"))
                .andExpect(jsonPath("$.length()").value(1));
        mvc.perform(get(location))
                .andExpect(header().string("Content-Disposition", containsString("inline")))
                .andExpect(content().contentType("image/jpeg")).andExpect(content().bytes(bytes));
        mvc.perform(get(location).param("download", "true"))
                .andExpect(header().string("Content-Disposition", containsString("attachment")))
                .andExpect(header().string("Content-Disposition", containsString(".jpg")))
                .andExpect(content().bytes(bytes));
    }

    @Test
    void rejectsUnsupportedUploadAndAllowsFrontend() throws Exception {
        mvc.perform(multipart("/v1/images").file(new MockMultipartFile("file", "text.txt", "text/plain", new byte[]{1}))
                .param("name", "Teste").param("tags", "teste"))
                .andExpect(status().isBadRequest());
        mvc.perform(get("/v1/images").header("Origin", "http://localhost:3000"))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"));
        mvc.perform(get("/v1/images/inexistente")).andExpect(status().isNotFound());
    }
}
