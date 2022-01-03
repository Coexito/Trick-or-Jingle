package com.example.demo;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.net.URL;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
public class UserController {
    
    private Map<String, User> users = new HashMap<String, User>(); // Map of users
    String usersFileURL = "src/main/resources/static/db/users.txt"; // Users file url
    String tempUsersFileURL = "src/main/resources/static/db/tempUsers.txt"; // File used to delete one user
    
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
    
    
    @GetMapping("/users/{nick}")
    public User getUser(@PathVariable("nick") String nick) {

    	if(users.containsKey(nick))	// User is found
    	{
    		User user = users.get(nick);   
            return user;    		
    	}
    	else	// User is not found
    	{
    		throw new ResponseStatusException(
    				  HttpStatus.NOT_FOUND, "entity not found"
    		);
    	}
    	
    }
    
    @GetMapping("/password/{nick}")
    public String getPassword(@PathVariable("nick") String nick) {

    	if(users.containsKey(nick))	// User is found
    	{
    		User user = users.get(nick);   
            return user.getPassword();    		
    	}
    	else	// User is not found
    	{
    		throw new ResponseStatusException(
    				  HttpStatus.NOT_FOUND, "entity not found"
    		);
    	}
    	
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
    public void deleteUser(@PathVariable("nick") String nick) throws IOException {
	   
	   /*
	    * This method deletes the user in the .txt file by creating a
	    * new file to write the users that are NOT deleted,
	    * then deletes the old users file and uses the new
	   */
	   
	   if(users.containsKey(nick))
	   {
		   User deleteUser = users.get(nick); // The user to delete
		   
		   File inputFile = new File(usersFileURL);
		   File tempFile = new File(tempUsersFileURL);

		   BufferedReader reader = new BufferedReader(new FileReader(inputFile));
		   BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile));

		   String lineToRemove = deleteUser.getNick() + ";" + deleteUser.getPassword() + ";" + deleteUser.getScore();
		   String currentLine;

		   while((currentLine = reader.readLine()) != null) {
		       // trim newline when comparing with lineToRemove
		       String trimmedLine = currentLine.trim();
		       
		       if(trimmedLine.equals(lineToRemove)) 
		    	   continue;
		       
		       writer.write(currentLine + System.getProperty("line.separator"));
		   }
		   writer.close(); 
		   reader.close();
		   
		   inputFile.delete();
		   boolean successful = tempFile.renameTo(inputFile);
		   
		   
		   users.remove(nick);
	   }
    }

    
}