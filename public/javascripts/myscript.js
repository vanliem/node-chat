$(document).ready(function() {
	$(window).load(function(){
    $('#myModal').modal('show');
  });

  $('#myModal').modal({
   	backdrop: 'static', 
   	keyboard: false
  });

  $("#btnAdd").click(function(event) {
		if($.trim($("#txtUser").val()) === "") {
      		$("#error_msg").html('<div class="alert alert-danger" role="alert"><a href="#" class="alert-link">Vui lòng nhập Username</a></div>');
		} else {
			$(this).parent().parent().parent().parent().modal('hide');
		}
	});
});
var socket = io.connect('http://localhost:3000/');


/**
 * Load list current user online
*/
var isLoaded = false;
socket.on('user_online', function (data) {
    if (!isLoaded) {
        data.forEach(function (item, index) {
            updateUser(item['name']);
        });    
    }
    isLoaded = true;
});


/**
 * Add a user to list
 * */

$('#btnAdd').click(function () {
	var user = $('#txtUser').val();
	socket.emit('join', user);
    updateUser(user);
    saveUserSession(user);
});

socket.on('user_list', function (data) {
	updateUser(data);
});

function updateUser(user) {
    var xhtml = '<li class="media">';

	xhtml += '<div class="media-body">';
    xhtml += '<div class="media">';
    xhtml += '<a class="pull-left" href="#">';
    xhtml += '<img class="media-object img-circle" style="max-height:40px;" src="images/user.png" />';
    xhtml += '</a>';
    xhtml += '<div class="media-body" >';
    xhtml += '<h5>' + user + '</h5>';
    xhtml += '</div>';
    xhtml += '</div>';
    xhtml += '</div>';
    xhtml += '</li>';

    $('#listUser').append(xhtml);
}

/**
 * Send message
 **/

$('#btnSend').click(function (e) {
    var message = $('#txtMessage').val();
    var user = $('#listUser').attr('data-user-online') 
                        ? $('#listUser').attr('data-user-online') : 
                        $('#txtUser').val();
    var data = {user: user, message: message};

    socket.emit('message', data);
    updateChat(data);

    insertMessage(message);
});

socket.on('message_list',function (data) {
    updateChat(data);
});

function updateChat(data)
{
    var xhtml = '<li class="media">';
    xhtml += '<div class="media-body">';
    xhtml += '<div class="media">';
    xhtml += '<a class="pull-left" href="#">';
    xhtml += '<img class="media-object img-circle" src="images/user.png" />';
    xhtml += '</a>';
    xhtml += '<div class="media-body" >';
    xhtml += data.message;
    xhtml += '<br />';
    xhtml += '<small class="text-muted">' + data.user + '</small>';
    xhtml += '<hr />';
    xhtml += '</div>';
    xhtml += '</div>';
    xhtml += '</div>';
    xhtml += '</li>';

    $('#listMessage').append(xhtml);
}

function saveUserSession(user)
{
    var request = $.ajax({
      url: "/session-user/" + user,
      method: "GET",
      dataType: "JSON"
    });
     
    /*request.done(function(response) {
      updateUser(response.user);
    });*/
     
    request.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
    });
}

function insertMessage(message)
{
    /*var request = $.ajax({
      url: "/insert-message",
      method: "POST",
      dataType: "JSON",
      data: {message: message}
    });
     
    request.done(function(response) {
      //updateUser(response.user);
    });
     
    request.fail(function( jqXHR, textStatus ) {
      //alert( "Request failed: " + textStatus );
    });*/

    $.post( "/insert-message", { message: message}, "json")
        .done(function (response) {
            console.log(response);
        });
}