package com.example.demo;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.net.URL;

import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
public class UserController {
    
    private Map<String, User> users = new HashMap<String, User>(); // Map of users
    String usersFileURL = "src/main/resources/static/db/users.txt"; // Users file url
    
    public UserController()
    {
    	// Fills the memory users map using the txt file.
    	try {
    	      File myObj = new File(usersFileURL);
    	      Scanner myReader = new Scanner(myObj);
    	      
    	      while (myReader.hasNextLine()) 
    	      {
    	    	// Creates temporary user read from the txt file
    	        String data[] = myReader.nextLine().split(";");
    	        User auxUser = new User(data[0], data[1]);
    	        auxUser.setScore(Integer.parseInt(data[2]));	// Sets the score it may have
    	        
    	        users.put(auxUser.getNick(), auxUser);
    	      }
    	      
    	      myReader.close();
    	      
    	    } catch (FileNotFoundException e) {
    	      System.out.println("An error occurred reading the users.");
    	      e.printStackTrace();
    	    }
    }
    
    
    @GetMapping("/users")
    public Map<String, User> getUsers(){
    	
        return users;
    }
    
    @GetMapping("/users/{nickname}")
    public User getUser(@PathVariable("nickname") String nick) {
    	User user = users.get(nick);    	
    	return user;
    }
    
    @PostMapping("/users")
    public ResponseEntity<Boolean> addUser(@RequestBody User newUser) 
    {
    	String nick = newUser.getNick();	// Uses the user nick as key
    	
    	if(!users.containsKey(nick))
    	{
    		users.put(nick, newUser);
    		
    		// Add user to the txt file
            try (Writer writer = new BufferedWriter(new FileWriter(usersFileURL, true))) // "true" parameter is for appending
            {
                String contents = "";
                contents = newUser.getNick() + ";" + newUser.getPassword() + ";" + newUser.getScore() + System.getProperty("line.separator");
                
                writer.write(contents);
                writer.close();
                System.out.println("User written succesfully");
                
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("Error writing user");
            }
    		
    		return new ResponseEntity<>(true, HttpStatus.CREATED);
    	}
    	else
    		return new ResponseEntity<>(false, HttpStatus.FOUND);
    } 
    
    
    @PutMapping("/users")
    public void updateUserScore(@RequestBody String u) 
    {
    	User user = users.get(u);
    	int lastScore = user.getScore();
    	user.setScore(lastScore++);
    }
    
   @DeleteMapping("/users/{nick}")
    public void deleteUser(@PathVariable("nick") String nick) {
    	
	   System.out.println("Entra en delete");
	   if(users.containsKey(nick))
	   {
		   System.out.println("Entra en if");
		   users.remove(nick);
	   }
    }

    
}