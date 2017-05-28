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
