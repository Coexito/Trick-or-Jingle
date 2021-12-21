package com.example.demo;

public class User {

	private String nick;
	private int score;
	
	public User() {
		
	}
    
    public User(String _nick){
        this.nick = _nick;
        this.score = 0;
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
}
