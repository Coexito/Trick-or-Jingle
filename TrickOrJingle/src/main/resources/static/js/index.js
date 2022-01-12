import { StartMenu } from './scenes/startmenu.js';
import { Login } from './scenes/login.js';
import { MainMenu } from './scenes/mainmenu.js';
import { Game } from './scenes/game.js';
import { Gameover } from './scenes/gameover.js';
import { Pause } from './scenes/pause.js';
import { Queue } from './scenes/queue.js';


$(document).ready(function() {
	
	const config = {
	  type: Phaser.AUTO,
	  width: 1280,
	  height: 680,
	  scene: [StartMenu, Login, Queue, MainMenu, Game, Gameover, Pause],
	  parent: "game",
	  dom: {
	    createContainer: true
	  },
	  physics: {
	    default: 'arcade',
	    arcade: {
	      gravity: { y: 700},
	      debug: false
	    }
	  }
	}
	
	
	
	var game = new Phaser.Game(config);



	var connection = new WebSocket('ws://localhost:8080');
	
	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}
	
	connection.onopen = function(){
		console.log("Opening socket");
	}
	connection.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var message = JSON.parse(msg.data)
		//$('#chat').val($('#chat').val() + "\n" + message.name + ": " + message.message);
	}
	connection.onclose = function() {
		console.log("Closing socket");
	}
	
	
		

		}
	);
