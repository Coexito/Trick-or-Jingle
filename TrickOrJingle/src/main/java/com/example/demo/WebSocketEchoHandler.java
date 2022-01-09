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

public class WebSocketEchoHandler extends TextWebSocketHandler{
	//uso de hashmaps para evitar problemas con la concurrencia
	private  int maxSessions = 2;
	
	
	//se podría añadir un número con las sesiones actuales abiertas pero
	//podemos utilizar sessions.size para saberlo.
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>(); //hashmap de sesiones(?)
	
	private ObjectMapper mapper = new ObjectMapper();
	
	
	//done. No tocar
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("400 OK. Message received: "
	 + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload()); //accedemos al cuerpo del mensaje
		
		sendOtherParticipants(session, node);
	} 
	
	
	
	//para enviar los datos a los demás participantes.
	//datos que enviar: cambios en posiciones de personajes, tipo de disparo, ángulo, origen y velocidad
	//Se envía un solo nodo con todos los datos
	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode(); //Nodo a través del que vamos a enviar las cosas
		
		//Cosas que vamos a enviar
		newNode.put("playerId", node.get("playerId").asText());
		
		//Pasamos estado del contrincante
		//Posición
		newNode.put("playerPositionX", node.get("playerPositionX").asDouble());
		newNode.put("playerPositionY", node.get("playerPositionY").asDouble());
		newNode.put("animation", node.get("animation")).asText();
		
		//Vida
		newNode.put("lives", node.get("lives")).asInt();
		//Con las vidas se puede calcular la victoria
		
		//armas. No se incluye HasWeapon porque no se llamara a la conexión si no se tiene una
		newNode.put("isShooting", node.get("isShooting").asBoolean());
		newNode.put("weapon", node.get("weapon").asText());
		newNode.put("angle", node.get("angle").asDouble());
		newNode.put("bulletSpeed", node.get("bulletSpeed").asDouble());

		// model: newNode.put("message", node.get("message").asText());
		
		//envío del nodo
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) { //para no enviarlo al que ha enviado los datos
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
	
	//Fuente: Ejercicios del aula
	@Override //notificar un alta de sesión
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		if(sessions.size()<=maxSessions) {
			System.out.println("New user: " + session.getId());
			ObjectNode aux = mapper.createObjectNode(); //nodo para indicar si está listo.
			//funciona como un booleano.
			aux.put("isReady", "1"); //1 --> está listo
			
			//"booleano" para indicar si es host
			ObjectNode host = mapper.createObjectNode();
			//creamos un nodo para el host 
			if(sessions.isEmpty()) { //player 1/host
				sessions.put(session.getId(), session); //añadimos la sesión al hashmap.
				host.put("isHost", 1); //si es el primero que se conecta, actúa como host
				session.sendMessage(new TextMessage("Player 1: Ready"));

			}
			else { //player 2
				host.put("isHost", 0); //si no es el primero, actúa como cliente
				sessions.put(session.getId(), session);
				session.sendMessage(new TextMessage("Player 2: Ready"));
			}
			
		
		}else {
			System.out.println("The server is full. Try later again");
		}
		
	}
	
	@Override //notificar una baja de sesión
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
}
