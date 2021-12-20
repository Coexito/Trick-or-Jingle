package com.example.demo;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestController {
	
	@GetMapping("/nick")
	String devolverNick(String usuario) {
		return "hola";
	}

}
