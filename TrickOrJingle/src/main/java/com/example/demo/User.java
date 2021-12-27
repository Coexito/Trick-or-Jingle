package com.example.demo;

public class User {

	private String nick;
	private int score;
	private String password;
	
	public User() { }
    
    public User(String _nick, String _password){
        this.nick = _nick;
        this.score = 0;
        this.password = _password;
    }
    
    public void setNick(String _nick) {
        this.nick = _nick;
    }
    
    public String getNick(){
        return this.nick;
    }
    
    public void setScore(int _score) {
        this.score = _score;
    }
    
    public int getScore(){
        return this.score;
    }
    
    public void setPassword(String _password) {
        this.password = _password;
    }
    
    public String getPassword(){
        return this.password;
    }
    
}
