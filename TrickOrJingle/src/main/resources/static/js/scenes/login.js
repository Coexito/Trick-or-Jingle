
//var url = "192.168.1.20";
export class Login extends Phaser.Scene {
  constructor() {
    super({ key: 'login' });

    this.username = 'Anonymous';
  }
  
  init(data)
  {
	this.url = data.url;
  }

  preload() {
    this.load.image('background_login', '../../Resources/Art/UI/SC_Username/SC_username_background.png');

    this.load.image('button', '../../Resources/Art/UI/SC_Choose/BT_select_small.png');
    this.load.image('button_ready', '../../Resources/Art/UI/SC_Choose/BT_select_big.png');
    
    this.load.html("form", "../form.html");
   
    
  }
  /*
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
			        url: this.url + "password/" + name.value,
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
		     	if(change)
		     	{	
		     		this.scene.stop();
	        		this.scene.start('Queue', { username: name.value, url: this.url});	
				} 
				else
				{ // if the given password doesn't match the one of the existing user, we can't change the scene
					text.setText('Wrong password. Try again'); // 
				}
	    	}
	    });
    
	}*/
	
	create() {
	    this.add.image(640, 340, 'background_login');
	    
	    // Creates variable for managing the textview
	    this.userInput = this.add.dom(640, 360).createFromCache("form");
		let name = this.userInput.getChildByName("name");
		let password = this.userInput.getChildByName("password");
		
		let text = this.add.text(450,500, '').setScale(2);
		
		let change = false; // boolean to change scene (at first is set to false)
	    
	    
	    this.startButton = this.add.sprite(650, 600, 'button');	
	    this.startButton.setInteractive().on('pointerdown', () => {
			if(name.value != "" && password.value != "")
			{			     	
				$.ajax({
					type: "POST",
					async: false,
					headers: {
						'Accept': 'application/json',
						'Content-type': 'application/json'
					},
					url: this.url + "users",
					data: JSON.stringify({ nick: "" + name.value, password: "" + password.value }),
					dataType: "json",
					success : function (boolean) { // returned variable to check if we can change the scene
							change = boolean;
						}
				})
		     	
		     	// Starts the next scene
		     	if(change){ // if we access with an existing user and correct password or create a new one we can change the scene
		     		this.scene.stop();
	        		this.scene.start('Queue', { username: name.value, url: this.url});	
				} else { // if the given password doesn't match the one of the existing user, we can't change the scene
					text.setText('Wrong password. Try again'); // 
				}
	    	}
	    });
	    
	    
    	
	}
  
}

