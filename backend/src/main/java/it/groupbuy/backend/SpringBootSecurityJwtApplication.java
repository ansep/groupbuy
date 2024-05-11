package it.groupbuy.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import it.groupbuy.backend.service.FilesStorageService;
import jakarta.annotation.Resource;

@SpringBootApplication
public class SpringBootSecurityJwtApplication implements CommandLineRunner {
    @Resource
    FilesStorageService storageService;

    public static void main(String[] args) {
	SpringApplication.run(SpringBootSecurityJwtApplication.class, args);
    }

    @Override
    public void run(String... arg) throws Exception {
	//storageService.deleteAll();
	storageService.init();
    }

}
