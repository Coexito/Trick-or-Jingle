package com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

//imports necesarios para websockets
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


@EnableWebSocket
public class WebSocketEchoHandler extends TextWebSocketHandler{
	
	//uso de hashmaps para evitar problemas con la concurrencia
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //hashmap de sesiones
	
	public String gameId;

	private ObjectMapper mapper = new ObjectMapper();
	private int maxSessions = 2;
	private boolean bothReady = false;
	
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("400 OK. Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		sendOtherParticipantsInGame(session, node);
	}
	
	//para enviar los datos a los demás participantes.
	//datos que enviar: cambios en posiciones de personajes, tipo de disparo, ángulo, origen y velocidad

	private void sendOtherParticipantsInGame(WebSocketSession session, JsonNode node) throws IOException {
		
		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode(); //objeto json con jackson
        
        newNode.put("x", node.get("x").asDouble());
        newNode.put("y", node.get("y").asDouble());
        newNode.put("isShooting", node.get("isShooting").asBoolean());
        newNode.put("canBeDamaged", node.get("canBeDamaged").asBoolean());
        newNode.put("lives", node.get("lives").asInt());
        
        
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
		
	}
	
	//Ejercicios del aula
	@Override //notificar un alta de sesión
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		ObjectNode player1 = mapper.createObjectNode();
	
		ObjectNode ready = mapper.createObjectNode();
		if(sessions.size()<=maxSessions) //control de usuarios
		{
			System.out.println("New user: " + session.getId());
			gameId = session.getId();
			
			
			player1.put("player1", 0); //Opción por defecto
			
			if(sessions.isEmpty()) {
				player1.put("player1", 1);
				System.out.println("Host conectado");
				sessions.put(session.getId(), session);
			}
			ready.put("isReady", 1);
			sessions.put(session.getId(), session);
			
			System.out.println("Probando: " + ready.toString());
			if(ready.size() == maxSessions) {
				bothReady = true;
			}

			
		}else {
			System.out.println("Server full. Try again later");
			
		}
		
		session.sendMessage(new TextMessage(player1.toString()));

		
	}
	
	@Override //notificar una baja de sesión
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId().charAt(maxSessions)  + "Current active players: " + (sessions.size()-1));
		
		
		//le notificamos al resto de participantes que el jugador se ha desconectado
		for(WebSocketSession participant : sessions.values()) {
			participant.sendMessage(new TextMessage("0"));
		}
		
		sessions.remove(session.getId()); //borramos la sesión
	}
	
}
