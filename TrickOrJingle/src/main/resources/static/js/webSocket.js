//Class websockets
	var connection = new WebSocket('ws://127.0.0.1:8080/');
	
	connection.onopen = function () {
	  connection.send('Estableciendo conexion');
	}

	connection.onmessage = function(msg) {
	  console.log("WS mensaje recibido: " + msg.data);
	}
	$(document).ready(function() {
	  $('#send-btn').click(function() {
	    var message = $('#message').val();
	    connection.send(message);
	  });
	});
	
	connection.onerror = function(e) {
	  console.log("WS error: " + e);
	}

	connection.onclose = function() {
	  console.log("WS Conexión cerrada");
	}	
	
