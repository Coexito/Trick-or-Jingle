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
public class WebSocketEchoHandler extends TextWebSocketHandler {
	
	//uso de hashmaps para evitar problemas de concurrencia
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //hashmap de sesiones
	
	private ObjectMapper mapper = new ObjectMapper();
	private int maxSessions = 2;
	
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("Message servidor received: " + message.getPayload());
		
		// The node with info is created and sent to the other participants in the game.
		JsonNode node = mapper.readTree(message.getPayload());
		sendOtherParticipantsInGame(session, node);
	}
	
	//para enviar los datos a los demás participantes.
	//datos que enviar: cambios en posiciones de personajes, tipo de disparo, ángulo, origen y velocidad
	private void sendOtherParticipantsInGame(WebSocketSession session, JsonNode node) throws IOException {
		
			System.out.println("Attempting to send message...");
			
			// Creates a JSON object to access the info
			ObjectNode newNode = mapper.createObjectNode(); //objeto json con jackson
	        
			// The JSON passed with parameters is used to fill the new JSON object just created
			newNode.put("id", node.get("id").asInt());
	        newNode.put("x", node.get("x").asDouble());
	        newNode.put("y", node.get("y").asDouble());
	        
	        for(WebSocketSession participant : sessions.values()) {
				if(!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
					System.out.println("Message sent to: " + participant.getId());
				}
			}
	        
	        /*
	        WebSocketSession p1 = sessions.get("1"); //devuelve la sesión del 1
	        WebSocketSession p2 = sessions.get("2"); //devuelve la sesión del 2
	        
	        
	        System.out.println("----------------------------------------------------------------");

	        System.out.println("getId1 " + p1.getId());
	        System.out.println("getId2 " + p2.getId());
	        System.out.println("getId Session " + session.getId());
	        */
	        //-----------------------------------------------------------------------------
	        /*if(p2.getId() != session.getId()) {
	        	System.out.println("soy la sesión 1");
	        }*/
	        
	        /*if(p2.getId() == session.getId()) {
	        	System.out.println("soy la sesión 2"); //lo mando al 1
				p1.sendMessage(new TextMessage(newNode.toString()));
				

	        }
	        else {
	        	
	        	System.out.println("soy la sesión 1");
	        	//lo mando al 2
				p2.sendMessage(new TextMessage(newNode.toString()));

	        }*/
	        
	        
	        /*
	        try {
			for(WebSocketSession participant : sessions.values()) {
				System.out.println("participante fuera: "+ participant.getId() + " sesión fuera " + session.getId());
	
				
				if(!participant.getId().equals(session.getId())) {
					synchronized(participant){
					
						System.out.println("participante dentro: "+ participant.getId() + " sesión dentro " + session.getId());
						participant.sendMessage(new TextMessage(newNode.toString()));
					}
				}
			}
			}catch(Exception e) {
				System.out.println(e.getMessage());
				System.out.println(e.getLocalizedMessage());
			}*/
			
	}
	
	//Ejercicios del aula
	@Override //notificar un alta de sesión
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
			
		System.out.println("Attempting to start session...");
		
		if(sessions.size() < maxSessions) //control de usuarios
		{
			System.out.println("New session: " + session.getId());
			sessions.put(session.getId(), session);			
						
			if( sessions.size() == maxSessions) {
				System.out.println("2 players connected, game starts");
			}

			
		}else {
			System.out.println("Server full. Try again later");
			
		}
		
	}
	
	@Override //notificar una baja de sesión
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		System.out.println("Session closed: " + session.getId());
		System.out.println( "Current active players: " + (sessions.size()-1));
		
		//le notificamos al resto de participantes que el jugador se ha desconectado
		for(WebSocketSession participant : sessions.values()) {
			participant.sendMessage(new TextMessage("0"));
		}
		
		sessions.remove(session.getId()); //borramos la sesión
	}
	
}
