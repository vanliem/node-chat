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
$('#btnAdd').on('click', function () {
	var user = $('#txtUser').val();
	socket.emit('join', user);
});

socket.on('user_list', function (data) {
	updateUser(data);
});

function updateUser(user) {
	var xhtml = '';
	xhtml += '<li class="media">';
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