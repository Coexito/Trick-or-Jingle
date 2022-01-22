<var ready = false; //Number of players that have chosen their team
 
export class MainMenu extends Phaser.Scene {
  
  constructor() {
    super({ key: 'mainmenu' });

    this.p1team = "None";
    this.p2team = "None";
  }
  
  init(data, conn) {
    this.username = data.username;
    this.connection = conn;
    console.log("Conexión realizada con éxito");

  }

  preload() {
    this.load.image('welcome', '../../Resources/Art/UI/SC_Choose/BT_select_small.png');
    this.load.image('background', '../../Resources/Art/UI/SC_Choose/SC_choose_base.png');

    this.load.image('h_button_small', '../../Resources/Art/UI/SC_Choose/BT_halloween_small.png');
    this.load.image('c_button_small', '../../Resources/Art/UI/SC_Choose/BT_christmas_small.png');
    this.load.image('h_button_big', '../../Resources/Art/UI/SC_Choose/BT_halloween_big.png');
    this.load.image('c_button_big', '../../Resources/Art/UI/SC_Choose/BT_christmas_big.png');

    this.load.image('button_not_ready', '../../Resources/Art/UI/SC_Choose/BT_select_small.png');
    this.load.image('button_ready', '../../Resources/Art/UI/SC_Choose/BT_select_big.png');
    
    this.load.image('button_delete_user', '../../Resources/Art/UI/SC_Username/BT_deleteUser_small.png');
    
    
  }
  
  create() {
	
	activeUsersNumber = 0;
	activePrevUsersNumber = 0;
    this.add.image(640, 340, 'background');
    

    this.h_button = this.add.image(460, 350, 'h_button_small');
	
	//Player chooses team
    this.h_button.setInteractive().on('pointerdown', () => {
      this.h_button.setTexture("h_button_big");
      this.c_button.setTexture("c_button_small");
		
	
      this.team = "halloween";

      this.startButton.setTexture("button_ready");


    });

    this.c_button = this.add.image(830, 350, 'c_button_small');
    this.c_button.setInteractive().on('pointerdown', () => {
      this.c_button.setTexture("c_button_big");
      this.h_button.setTexture("h_button_small");

      this.p1team = "christmas";
      
      this.startButton.setTexture("button_ready");
    });

    this.startButton = this.add.sprite(650, 600, 'button_not_ready');
    
    this.startButton.setInteractive().on('pointerdown', () => {
		//connection via websocket: "I'm ready"
		ready =true;
		connection.send(
			JSON.stringify({
				ready: ready
			})
		);
		
      if(this.team != "None")
        this.scene.stop();
        this.scene.start('game', { team: this.team, username: this.username, connection:connection });

    });
    
    
    this.deleteUserButton = this.add.sprite(950, 600, 'button_delete_user');
    this.deleteUserButton.setScale(0.5);
    this.deleteUserButton.setInteractive().on('pointerdown', () => 
    {
		let username = this.username;
		
		$.ajax({
	        method: "DELETE",
	        url: url+ "users/" + username,
	        success : function () {
				console.log("User removed");
			},
			error : function () {
				console.log("Failed to delete");
				console.log("The URL was:\n" + url + "users/"+username)
			}
	     })	
	     	
	     	// Changes scene after making the Delete  
			this.scene.stop();
	    	this.scene.start('login', {url: url});
    });
    
          textActiveUsers = this.add.text(100, 100, 'Current users: ' + activeUsersNumber);

    
    
  // -------------- CHAT ---------------
	
	let username = this.username;
	
	document.getElementById('chatBox').placeholder='Enter message';
	
	$("#chatButton").click(function () {
	if($("#chatBox").val() != null){
			sendMessage(username, $("#chatBox").val());
		}
	})
	
	setInterval (getMessage, 2500); // reloads the chat every so often
	// ------------------------------------
  }
  
  update(){
		
		getActiveUsers();
		updateActiveUsers();
		textActiveUsers.setText('Current users: ' + activeUsersNumber);
		console.log(activeUsersNumber);
	}
	
	
	
  

}

// --------- CHAT ------------------

function sendMessage(user, message)
{
	$.ajax({
		type: "POST",
		async:false,
		headers: {
			'Accept': 'application/json',
			'Content-type' : 'application/json'	
		},
		url: url + "chat",
		data: JSON.stringify( { user: ""+user, message: ""+message } ),
		dataType: "json" 
	})
	getMessage();
}

function getMessage() {
	for (let i = 0; i < 4; i++) {
		$.ajax({
			method: "GET",
			url: url + "chat/" + i.toString()
		}).done(function(data){
			if(data != "")
				document.getElementById("message"+i.toString()).innerHTML = data;
		})
	}

}







function updateActiveUsers(){
	if(activePrevUsersNumber != activeUsersNumber)
	 {
		if(activePrevUsersNumber < activeUsersNumber)
			console.log("Se ha conectado alguien. El nÃºmero actual de usuarios es: " + activeUsersNumber);
		else if(activePrevUsersNumber > activeUsersNumber){
			console.log("Alguien se ha desconectado. El nÃºmero actual de usuarios es: " + activeUsersNumber);
			//conn.close();
			
			}
			
		activePrevUsersNumber = activeUsersNumber;
	}
	
}

function getActiveUsers(){
		      $.ajax({
			      url:  url + "currentUsersNum",
			      method: 'GET',
			      dataType: 'json'
			      }).done(function(data) {
					activeUsersNumber = data;
		      	}); 
}  