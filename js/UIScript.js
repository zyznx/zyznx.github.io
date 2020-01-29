
var login_str = $.ajax({
    type: 'GET',
    url: '/TestItemCollection/Login.html',
    async: false
}).responseText;
$('#login_container').html(login_str);
//$.getScript('/TestItemCollection/login-ui.js');
$('#login_container').css('visibility', 'visible');
$('.My-button').button();
$('head').append('<script src="\\TestItemCollection\\login-ui.js"></script>')