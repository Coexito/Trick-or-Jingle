package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@SpringBootApplication
@EnableWebSocket
public class TrickOrJingleApplication implements WebSocketConfigurer{ //implementamos la interfaz necesaria

	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(gameHander(), "/game").setAllowedOrigins("*");
		
		
		
	}
	
	@Bean //le indicamos a spring que se trata de un componente
	public WebSocketEchoHandler gameHander() {
		System.out.println("creando juego");
		return new WebSocketEchoHandler();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(TrickOrJingleApplication.class, args);
		
		System.out.println("Server iniciado con éxito.");

	}

	

}