package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
public class Controller {
    
    private List<User> users = new ArrayList<>(); // list of users
    
    @GetMapping("/users")
    public List<User> getUsers(){
        return users;
    }
    
    @PostMapping("/users")
    public ResponseEntity<Boolean> addUser(@RequestBody User newUser) 
    {
            users.add(newUser);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
    }
    
    /*@PutMapping("/users")
    public void updateUserScore(@RequestBody String user) 
    {
    	for (User u : users) {
            if (u.getNick().equals(user)) {
            	int lastScore = u.getScore();
            	u.setScore(lastScore++);
            }
        }
    }*/ // El put no se hace así, ni idea de como se hace la vd
    
}