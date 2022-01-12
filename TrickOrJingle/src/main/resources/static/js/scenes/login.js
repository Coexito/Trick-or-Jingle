$(document).ready(function(){
  console.log('El DOM está cargado (login)')
});


export class Login extends Phaser.Scene {
  constructor() {
    super({ key: 'login' });

    this.username = 'Anonymous';
  }

  preload() {
    this.load.image('background_login', '../../Resources/Art/UI/SC_Username/SC_username_background.png');

    this.load.image('button', '../../Resources/Art/UI/SC_Choose/BT_select_small.png');
    this.load.image('button_ready', '../../Resources/Art/UI/SC_Choose/BT_select_big.png');
    
    this.load.html("form", "../form.html");
   
    
  }
  
	create() {
	    this.add.image(640, 340, 'background_login');
	    
	    // Creates variable for managing the textview
	    this.userInput = this.add.dom(640, 360).createFromCache("form");
		let name = this.userInput.getChildByName("name");
		let password = this.userInput.getChildByName("password");
		
		let text = this.add.text(450,500, '').setScale(2);
		let change = false; // boolean to change scene
	    
	    this.startButton = this.add.sprite(650, 600, 'button');	
	    this.startButton.setInteractive().on('pointerdown', () => {
			if(name.value != "" && password.value != "")
			{			
				// Checks if the user exists				
				$.ajax({
			        method: "GET",
			        async: false,
			        url: "http://localhost:8080/password/"+name.value,
			        success : function (userPassword) {
						if (userPassword == password.value){
							console.log("User " + name.value +" exists. Logging in");
							change = true; // boolean to change scene
						}
						else {
							console.log("Password doesn't match the existing user");
							text.setText('Wrong password. Try again');
						}
					},
					error : function () {
						console.log("User does not exist.\nProcceeding to create it");
						createUser(name.value, password.value);
		     			change = true; // boolean to change scene
					}
					
		     	})
		     	
		     	// Starts the next scene
		     	if(change){	
		     		this.scene.stop();
<<<<<<< Updated upstream
	        		this.scene.start('mainmenu', { username: name.value});	
=======
		     		
	        		this.scene.start('Queue', { username: name.value});	
				} else { // if the given password doesn't match the one of the existing user, we can't change the scene
					text.setText('Wrong password. Try again'); // 
>>>>>>> Stashed changes
				}
	    	}
	    });
    
	}
  
}


function createUser(user, pass)
{
	$.ajax({
		type: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-type' : 'application/json'	
		},
		url: "http://localhost:8080/users",
		data: JSON.stringify( { nick: ""+user, password: ""+pass } ),
		dataType: "json" 
	})
}