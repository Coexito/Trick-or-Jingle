import { StartMenu } from './scenes/startmenu.js';
import { Login } from './scenes/login.js';
import { MainMenu } from './scenes/mainmenu.js';
import { Game } from './scenes/game.js';
import { Gameover } from './scenes/gameover.js';
import { Pause } from './scenes/pause.js';
import { Queue } from './scenes/queue.js';



	
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

	

	
	
		

