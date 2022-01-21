//QUEUE SCREEN

//var url = "192.168.1.20";
var timedEventText;

var refreshTime = 100;
var maxUsers = 2;

var activePrevUsersNumber = 0;
var activeUsersNumber = 0;

var connection;
var username;
var countdown = 1;
var countdownText;
var ready = false;
var textUsers;
var previous = 0;
var id;

let url;

export class Queue extends Phaser.Scene {
	
	constructor(){
		super({key: 'Queue'});		
	}
	
	init (data){
		username = data.username;
		url = data.url;
		connection = data.connection;
	}
	
	preload(){
		//background
		this.load.image('background_queue', '../../Resources/Art/UI/SC_Queue/BG_Queue.png');
	}

	create(){
		countdown = 1;
		
	    //background
	    this.bg_queue = this.add.image(640, 340, 'background_queue');
	    textUsers = this.add.text(100, 100, 'clientes conectados: ' + activeUsersNumber.toString());
	    countdownText = this.add.text(600,600, " ");
	    
	    this.maxUsersIter = 0;

		if(connection == null || connection == undefined)			// If it's the first attempt to connect
	    	connection = new WebSocket("ws://localhost:8080/game");
	    	
	    console.log("Websocket url:\n ws://" + url + "game");
	    
	    //damos valor a los atributos de la conexión en el método en el que la creamos
	    connection.onerror = function(e){
			console.log("WS error: " + e);
		}
		
		connection.onclose = function(){
			closinSocket();
			console.log("Closing socket.");
			
		}	    
	}
	

	
	update()
	{
		getActiveUsers(); //actualiza
		updateActiveUsers(); //comprobación
	
		if(activeUsersNumber == 1)
			id = 1;
		else if(activeUsersNumber == 2 && id==null)  //Comprobamos si está vacío para no sobrescribir el del jugador 1
			id = 2;
		
		textUsers.setText('Current clients: ' + activeUsersNumber.toString() + " Your username: " + username);
		
		previous = Date.now();
			
		if(activeUsersNumber == maxUsers)
			this.maxUsersIter++;
			
		if(this.maxUsersIter==1){
			this.readyText = this.add.text(150, 150, 'Player 2 is ready. Starting game, please dont close the window...');
			timedEventText = this.time.addEvent({ delay: 3000, callback: updateText, callbackScope: this, loop: true });

			//updateText();
		}
			
		if (countdown <= 0) {
			console.log("Iniciando juego");
			this.scene.stop();
			this.scene.start("game", { username: username, id:id, url:url, websocket: connection });
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

function closinSocket(){
	$.ajax({
	    method: "DELETE",
	    url: url + "currentUsers/" + username,
	    success : function () {
			console.log("Current user removed");
		},
		error : function () {
			console.log("Failed to delete");
			console.log("The URL was:\n" + url +"currentUsers/"+username)
		}
	})	     	
}


function updateActiveUsers(){
	if(activePrevUsersNumber != activeUsersNumber)
	 {
		if(activePrevUsersNumber < activeUsersNumber)
			console.log("User connected. Total current users: " + activeUsersNumber);
		else if(activePrevUsersNumber > activeUsersNumber){
			console.log("User disconnected. Total current users: " + activeUsersNumber);
			conn.close();
		}
		activePrevUsersNumber = activeUsersNumber;
	}
	
}

function getActiveUsers(){
	$.ajax({
		url: url + 'currentUsersNum',
		method: 'GET',
		dataType: 'json'
		}).done(function(data) {
			activeUsersNumber = data;
	}); 
}  






