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


/** Send message */

function updateChat(name, message) {
    var xhtml = '<li class="media">';
    xhtml += '<div class="media-body">';
    xhtml += '<div class="media">';
    xhtml += '<a class="pull-left" href="#">';
    xhtml += '<img class="media-object img-circle" src="images/user.png" />';
    xhtml += '</a>';
    xhtml += '<div class="media-body" >';
    xhtml += message;
    xhtml += '<br />';
    xhtml += '<small class="text-muted">' + name + '</small>';
    xhtml += '<hr />';
    xhtml += '</div>';
    xhtml += '</div>';
    xhtml += '</div>';
    xhtml += '</li>';

    $('#listMessage').append(xhtml);
}

function saveUserSession(user) {
    var request = $.ajax({
        url: "/session-user/" + user,
        method: "GET",
        dataType: "JSON"
    });

    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function insertMessage(message) {
    $.post("/insert-message", {
            message: message
        }, "json")
        .done(function(response) {
        });
}