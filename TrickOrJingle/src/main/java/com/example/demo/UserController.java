package com.example.demo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
public class UserController {
    
    private Map<String, User> users = new HashMap<String, User>(); // Map of users
    
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
    
   /* @DeleteMapping("/users/{nick}")
    public void deleteUser(@PathVariable("nick") String nick) {
    	
    	if(users.containsKey(nick))
    	{
    		users.remove(nick);
    	}
    }*/
    
    @RequestMapping(value = "/users/{nick}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("nick") String nick) {
    	if(users.containsKey(nick))
    	{
    		users.remove(nick);
    	}
    }

    
}