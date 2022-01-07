package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.*;
import java.util.Stack;

@RestController
public class MessageController {
	Stack<String> messages = new Stack<String>();
	String chatFileURL = "src/main/resources/static/db/chat.txt"; // Users file url
	
	@PostMapping("/chat")
	public void postMessage(@RequestBody Message message) throws FileNotFoundException {
		
		String contents = "";
        contents = message.getUser() + ": " + message.getMessage() + System.getProperty("line.separator");
		
		// Add message to the txt file
        try (Writer writer = new BufferedWriter(new FileWriter(chatFileURL, true))) // "true" parameter is for appending
        {
            writer.write(contents);
            writer.close();
            System.out.println("User written succesfully");
            
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error writing user");
        }
        messages.add(contents);
	}
	
	@GetMapping("/chat/{i}")
	public String getMessage(@PathVariable("i") String i) {
		
		int size = messages.size();
		System.out.println("user: "+i + " size: " + size);
		
		String message = "";
		if(i.equals("0") && size>=1) {
			message = messages.get(size-1);
		}
		if(i.equals("1") && size>=2) {
			message = messages.get(size-2);
		}
		if(i.equals("2") && size>=3) {
			message = messages.get(size-3);
		}
		if(i.equals("3") && size>=4) {
			message = messages.get(size-4);
		}
			
		return message; 
	}
}
