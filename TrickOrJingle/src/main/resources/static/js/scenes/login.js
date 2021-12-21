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
    this.nameInput = this.add.dom(640, 360).createFromCache("form");
	let name = this.nameInput.getChildByName("name");
    
    this.startButton = this.add.sprite(650, 600, 'button');	
    this.startButton.setInteractive().on('pointerdown', () => {
		if(name.value != "")
		{
			this.username = name.value;
			
			// Connects to the server
				//$(document).ready(function() {
			      $.ajax({
			        type: "POST",
			        headers: {
						'Accept': 'application/json',
						'Content-type' : 'application/json'
				
					},
			        url: "http://localhost:8080/users",
			        data: JSON.stringify("" + this.username),
			        dataType: "json" })
			//});
			this.scene.stop();
        	this.scene.start('mainmenu', { username: this.username});
    
    }});
    
  }
  
 
    
  
  
  
  
}