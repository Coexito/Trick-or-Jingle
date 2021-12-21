package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
public class Controller {
    
    private List<User> users = new ArrayList<>(); // list of users

    @GetMapping("/getUsers")
    public List<User> getUsers(){
        return users;
    }
    
    @PostMapping("/postUsers")
    public ResponseEntity<Boolean> addUser(@RequestBody User newUser) 
    {
        if(!users.contains(newUser)) {
            users.add(newUser);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        } else
            return new ResponseEntity<>(false, HttpStatus.OK);
    }
}