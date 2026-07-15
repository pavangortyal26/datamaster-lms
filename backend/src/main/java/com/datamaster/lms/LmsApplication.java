package com.datamaster.lms;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class LmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(LmsApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(Environment env){
        return args -> {
            System.out.println(env.getProperty("SUPABASE_DB_URL"));
            System.out.println(env.getProperty("spring.datasource.url"));
        };
    }
}
