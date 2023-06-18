package com.impacthack.backend1.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://192.168.0.109:3000",
                        "http://localhost:3000"
                )
                .allowedMethods("GET","POST","PUT","DELETE")
                .exposedHeaders(
                        "Access-Control-Allow-Origin",
                        "Access-Control-Allow-Headers",
                        "Access-Control-Allow-Methods",
                        "Access-Control-Expose-Headers"
                );
                //.allowedHeaders("Authorization", "Origin");
    }
}
