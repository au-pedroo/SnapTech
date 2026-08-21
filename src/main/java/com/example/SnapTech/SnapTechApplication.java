package com.example.SnapTech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SnapTechApplication {

	public static void main(String[] args) {
		SpringApplication.run(SnapTechApplication.class, args);
	}

}
