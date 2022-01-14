//QUEUE SCREEN
import { Player } from '../Player.js';


var timedEventText;

var refreshTime = 100;
var maxUsers = 2;

var activePrevUsersNumber = 0;
var activeUsersNumber = 0;

var username;
var countdown = 10;
var countdownText;
var ready = false;
var textUsers;
var previous = 0;
export class Queue extends Phaser.Scene{
	
	
	constructor(){
		super({key: 'Queue'});
		

		
	}
	init (data){
		username = data.username;
	}
	preload(){
		//background
		this.load.image('background_queue', '../../Resources/Art/UI/SC_Queue/BG_Queue.png');
	}

	create(){
		
	    //background
	    this.bg_queue = this.add.image(640, 340, 'background_queue');
	    textUsers = this.add.text(100, 100, 'clientes conectados: ' + activeUsersNumber.toString());
	    countdownText = this.add.text(600,600, " ");
	    
	    

	    //let text = this.add.text(100, 100, activeUsersNumber.toString());
		//let text = this.add.text(475,500, 'OtherPlayerName').setScale(2);
	    
	}
	

	
	update(){
		if(Date.now()-previous > refreshTime){
			//this.sessions();
			
			getActiveUsers(); //actualiza
			updateActiveUsers(); //comprobación
			
			textUsers.setText('Current clients: ' + activeUsersNumber.toString() + " Your username: " + username);
			
			previous = Date.now();
			
			if(activeUsersNumber == maxUsers){
				
				this.readyText = this.add.text(150, 150, 'Player 2 is ready. Starting game in...');
				timedEventText = this.time.addEvent( { delay: 1000, callback: updateText, callbackScope: this, loop: true});

				updateText();
     			if(countdown <= 0){
					this.scene.stop();
	      			this.scene.start("mainmenu", {username:username});
				}
				
			}
		}
	}
}

function updateText(){
	countdownText.setText(formatTime(countdown)).setScale(5); // create text

	countdown--;
	
}

function formatTime(totalSeconds){
    var minutes = Math.floor(totalSeconds/60); // divide total seconds by 60 to get minutes
    var seconds = totalSeconds%60; // get remainder of seconds divided by 60 to get seconds
    seconds = seconds.toString().padStart(2,'0'); // add left zeros to seconds

    return `${minutes}:${seconds}`;     // return formated time
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
		      $.ajax({
			      url: 'http://localhost:8080/currentUsersNum',
			      method: 'GET',
			      dataType: 'json'
			      }).done(function(data) {
					activeUsersNumber = data;
		      	});
		      	
		 
}  






