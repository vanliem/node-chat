/**
 * Load list current user online
 */
var isUserLoaded = false;
socket.on('user_online', function(data) {
	if (!isUserLoaded) {
		data.forEach(function(item, index) {
			updateUser(item['name']);
		});
	}
	isUserLoaded = true;
});


var isMessageLoaded = false;
socket.on('messages', function(data) {
	if (!isMessageLoaded) {
		data.forEach(function(item, index) {
			updateChat(item['name'], item['messages']);
		});
	}
	isMessageLoaded = true;
});


/**
 * Add a user to list
 * */

$('#btnAdd').click(function() {
	var user = $('#txtUser').val();
	socket.emit('join', user);
	updateUser(user);
	saveUserSession(user);
});

socket.on('user_list', function(data) {
	updateUser(data);
});


$('#btnSend').click(function(e) {
	var message = $('#txtMessage').val();
	var user = $('#listUser').attr('data-user-online') ? $('#listUser').attr('data-user-online') :
		$('#txtUser').val();
	var data = {
		user: user,
		message: message
	};

	socket.emit('message', data);
	updateChat(data.user, data.message);

	insertMessage(message);
});

socket.on('message_list', function(data) {
	updateChat(data.user, data.message);
});