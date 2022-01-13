let url;

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'mainmenu' });

    this.p1team = "None";
    this.p2team = "None";
  }
  
  init(data) {
    this.username = data.username;
    url = data.url;
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
    this.add.image(640, 340, 'background');

    this.h_button = this.add.image(460, 350, 'h_button_small');

    this.h_button.setInteractive().on('pointerdown', () => {
      this.h_button.setTexture("h_button_big");
      this.c_button.setTexture("c_button_small");

      this.p1team = "halloween";
      this.p2team = "christmas";  // THIS SOULD ME CHANGED IN PHASE 3

      this.startButton.setTexture("button_ready");

    });

    this.c_button = this.add.image(830, 350, 'c_button_small');
    this.c_button.setInteractive().on('pointerdown', () => {
      this.c_button.setTexture("c_button_big");
      this.h_button.setTexture("h_button_small");

      this.p1team = "christmas";
      this.p2team = "halloween";  // THIS SOULD ME CHANGED IN PHASE 3
      
      this.startButton.setTexture("button_ready");
    });

    this.startButton = this.add.sprite(650, 600, 'button_not_ready');
    
    this.startButton.setInteractive().on('pointerdown', () => {
      if(this.p1team != "None" || this.p2team != "None")
        this.scene.stop();
        this.scene.start('game', { p1team: this.p1team, p2team: this.p2team, username: this.username, url: url });
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