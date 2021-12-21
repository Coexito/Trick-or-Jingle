package com.example.demo;

public class User {

	private String nick;
    
    public User(String _nick){
        this.nick = _nick;
    }
    
    public void setNick(String _nick) {
        this.nick = _nick;
    }
    
    public String getNick(){
        return this.nick;
    }
}
