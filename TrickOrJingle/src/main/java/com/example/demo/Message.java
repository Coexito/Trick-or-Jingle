package com.example.demo;

public class Message {
	private String user;
	private String message;
	
	public Message() {}
	
	public Message(String _user, String _message) {
		this.user = _user;
		this.message = _message;
	}
	
	public void setUser(String _user) {
		this.user = _user;
	}
	
	public void setMessage(String _message) {
		this.message = _message;
	}
	
	public String getUser() {
		return this.user;
	}
	
	public String getMessage() {
		return this.message;
	}
}

