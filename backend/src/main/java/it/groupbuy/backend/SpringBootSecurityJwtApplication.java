package it.groupbuy.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import it.groupbuy.backend.service.FilesStorageService;
import jakarta.annotation.Resource;

@SpringBootApplication
public class SpringBootSecurityJwtApplication implements CommandLineRunner {
    @Resource
    FilesStorageService storageService;

    private static final Logger log = LoggerFactory.getLogger(SpringBootSecurityJwtApplication.class);

    public static void main(String[] args) {
	SpringApplication.run(SpringBootSecurityJwtApplication.class, args);
	log.info("Application started successfully");
    }

    @Override
    public void run(String... arg) throws Exception {
	//storageService.deleteAll();
	storageService.init();
    }

}
