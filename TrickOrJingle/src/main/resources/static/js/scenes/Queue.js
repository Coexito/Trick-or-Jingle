//QUEUE SCREEN
import { Player } from '../Player.js';




var refreshTime = 100;
var currentUsers = 0;
var maxUsers = 2;
var previous = 0;
export class Queue extends Phaser.Scene{
	
	
	constructor(){
		super({key: 'Queue'});
		

		
	}
	preload(){
		//background
		this.load.image('background_queue', '../../Resources/Art/UI/SC_Queue/BG_Queue.png');
	}

	create(){
		
	    //background
	    this.bg_queue = this.add.image(640, 340, 'background_queue');
		 $(document).ready(function(){
		      console.log('Usuarios activos: ')
		      $.ajax({
		      url: 'http://localhost:8080/currentUsers',
		      method: 'GET',
		      dataType: 'json'
		      }).done(function(data) {
		      console.log(data);
		      });
		      }); 
		
		
		let text = this.add.text(475,500, 'OtherPlayerName').setScale(2);
	    this.bg_queue.setInteractive().on('pointerdown', () => {
	      this.scene.stop();
	      this.scene.start("MainMenu");
   		});
	}
	
	update(){
		if(Date.now()-previous > refreshTime){
			//this.sessions();
			
			previous = Date.now();
		}
	}
	
}

