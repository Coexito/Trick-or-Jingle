//QUEUE SCREEN
import { Player } from '../Player.js';




var refreshTime = 100;
var maxUsers = 2;

var activePrevUsersNumber = 0;
var activeUsersNumber = 0;
var username1 = "";
var username2 = "";

var textUsers;
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
	    textUsers = this.add.text(100, 100, 'clientes conectados: ' + activeUsersNumber.toString());

	    //let text = this.add.text(100, 100, activeUsersNumber.toString());
		//let text = this.add.text(475,500, 'OtherPlayerName').setScale(2);
	    this.bg_queue.setInteractive().on('pointerdown', () => {
	      this.scene.stop();
	      this.scene.start("MainMenu");
   		});
	}
	
	
	
	
	update(){
		if(Date.now()-previous > refreshTime){
			//this.sessions();
			textUsers.setText('clientes conectados: ' + activeUsersNumber.toString());
			getActiveUsers(); //actualiza
			updateActiveUsers(); //comprobación
			
			previous = Date.now();
		}
	}
	
	
	
	
	
	
}

function updateActiveUsers(){
	if(activePrevUsersNumber != activeUsersNumber)
	 {
		if(activePrevUsersNumber < activeUsersNumber)
			console.log("Se ha conectado alguien. El número actual de usuarios es: " + activeUsersNumber);
		else if(activePrevUsersNumber > activeUsersNumber){
			console.log("Alguien se ha desconectado. El número actual de usuarios es: " + activeUsersNumber);
			
			}
			
		activePrevUsersNumber = activeUsersNumber;
	}
	
}

function getActiveUsers(){
		  
		  $(document).ready(function(){
		      
		      $.ajax({
					url: 'http://localhost:8080/currentUsersNicks',
			      	method: 'GET',
			     	dataType: 'json'
			      }).done(function(data) {
				
					let users = JSON.stringify(data);
					console.log(users);
					//let text = this.add.text(475,500, users).setScale(2);
					
					
			  });
		      
		      $.ajax({
			      url: 'http://localhost:8080/currentUsersNum',
			      method: 'GET',
			      dataType: 'json'
			      }).done(function(data) {
					activeUsersNumber = data;
		      	});
		  });  
}




