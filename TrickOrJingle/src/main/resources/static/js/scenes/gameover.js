var connection;

export class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' });
  }
  
  init(data) {
    this.winnerteam = data.winnerteam;
    this.username = data.username;
    this.win = data.win;
    this.url = data.url;
    connection = data.connection;
    
  }

  preload() {
    this.load.image('background_endgame_christmas', '../../Resources/Art/UI/SC_Win_Christmas/SC_Win_Christmas_base.png');
    this.load.image('background_endgame_halloween', '../../Resources/Art/UI/SC_Win_Halloween/SC_win_halloween_base.png');
    this.load.image('background_endgame_draw', '../../Resources/Art/UI/SC_Draw/SC_draw_base.png');
    this.load.image('btn_endgame_rematch', '../../Resources/Art/UI/SC_Win_Halloween/BT_rematch.png');
  }
  
  create() {
	
	// Closes the websocket
	//connection.close();

    if(this.winnerteam == "halloween")
      this.add.image(640, 340, 'background_endgame_halloween');
    else if(this.winnerteam == "christmas")
      this.add.image(640, 340, 'background_endgame_christmas');
    else if(this.winnerteam == "draw")
      this.add.image(640, 340, 'background_endgame_draw');

    // Rematch btn
    this.bt_continue = this.add.image(640, 550, 'btn_endgame_rematch');
    this.bt_continue.setInteractive().on('pointerdown', () => {	
		
	    this.scene.start('Queue', {username: this.username, url: this.url, connection: connection, password: this.password});
	    this.scene.stop();
    });
    
    console.log("Player 1 won?: " + this.win)
    
    // delete currentUser
    $.ajax({
	        method: "DELETE",
	        url: this.url + 'currentUsers/' + this.username,
	        success : function () {
				console.log("User removed");
			},
			error : function () {
				console.log("Failed to delete");
			}
	     })
    
    if(this.win)
    {
		// Updates the user score
	    $.ajax({
	        type: 'PUT',
	        async: false,
	        url: this.url + 'users/' + this.username,
	    });
	    
	    console.log("Updated: " + this.url + 'users/' + this.username)
	}
    
    
  }
}