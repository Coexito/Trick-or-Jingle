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
    
    private Map <String, User> currentUsers = new HashMap<String, User>();
    

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
        
    @DeleteMapping("/currentUsers")
    public void closeSession(@PathVariable("nick") String nick)throws IOException{
 	   if(currentUsers.containsKey(nick)) {
 		   currentUsers.remove(nick);
 		   System.out.println("Un usuario se ha desconectado.");
 	   }
    }
    
    
    @GetMapping("/users")
    public Map<String, User> getUsers(){
    	
        return users;
    }
    
    @GetMapping("/currentUsers")
    public Map<String, User> getCurrentUsers(){
    	//System.out.println("Accediendo a los usuarios actuales");
    	return currentUsers;
    }
    
    
    @GetMapping("/currentUsersNum")
    public int getCurrentUsersNum() {
    	return currentUsers.size();
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
    
    
    @PostMapping("/currentUsers")
    public boolean addCurrentUser(@RequestBody User newUser) 
    {
    	String nick = newUser.getNick();	// Uses the user nick as key
    	
    	currentUsers.put(nick, newUser);
    	
    	return true;
    } 
    

    @PostMapping("/users")
    public boolean addUser(@RequestBody User newUser) 
    {
    	String nick = newUser.getNick();	// Uses the user nick as key
    	String password = newUser.getPassword();
    	
    	if(!users.containsKey(nick)) // if the user doesn't exist
    	{
    		users.put(nick, newUser); // we add the new user
    		
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
        	

    		return true; // we create the user and continue to the next scene
    		
    	} else { // the user exists
    		if(users.get(nick).getPassword().equals(password)) { // if the password given matches the stored one

    			return true; // we can change the scene
    		} else // if the password isn't the same
    			return false; // we can't change the scene
    	}
    		
    	
    } 
    
  
    @PutMapping("/users/{nickname}")
    public void updateUserScore(@PathVariable("nickname") String nickname) throws IOException 
    {
		// ---- Re-write the users to update the BD ------
		User updateUser = users.get(nickname); // The user to delete

		File inputFile = new File(usersFileURL);
		File tempFile = new File(tempUsersFileURL);

		BufferedReader reader = new BufferedReader(new FileReader(inputFile));
		BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile));

		String lineToUpdate = updateUser.getNick() + ";" + updateUser.getPassword() + ";" + updateUser.getScore();
		String currentLine;
		
		// Updates it in memory
		users.get(nickname).setScore(users.get(nickname).getScore() + 1);
		
		while ((currentLine = reader.readLine()) != null) {
			// trim newline when comparing with lineToRemove
			String trimmedLine = currentLine.trim();

			if (trimmedLine.equals(lineToUpdate))
			{
				// Updates that line
				writer.write(updateUser.getNick() + ";" + updateUser.getPassword() + ";" + updateUser.getScore() + System.getProperty("line.separator"));
				continue;
			}
				

			writer.write(currentLine + System.getProperty("line.separator"));
		}
		writer.close();
		reader.close();

		inputFile.delete();
		boolean successful = tempFile.renameTo(inputFile);
    	
    }
   
   @DeleteMapping("/currentUsers/{nick}")
   public void deleteCurrentUser(@PathVariable("nick") String nick)throws IOException{
	   if(currentUsers.containsKey(nick)) {
		   currentUsers.remove(nick);
		   System.out.println("Un usuario se ha desconectado.");
	   }
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
		   
		   currentUsers.remove(nick);

		   users.remove(nick);
	   }
    }

    
}