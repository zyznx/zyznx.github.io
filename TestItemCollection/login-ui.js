//@ sourceURL=msgprompt.js
$("<link>")
    .attr({
        rel: "stylesheet",
        type: "text/css",
        href: "\\TestItemCollection\\login.css"
    })
    .appendTo("head");
$('#loginDialog').dialog({
    width: 400,
    height: 200,
    title: '请您登录',
    dialogClass:"no-close",
    position: {
        my: 'center',
        at: 'center',
        of: '#_title'
    }
});
$('#loginDialog').parent().draggable('option', 'disabled',true);
$('#loginDialog').parent().css('top','300px');
$('#loginDialog').parent().appendTo('#login_container');

function onLogin() {
    var testNum = $('#testNumber').val();
    if(testNum === 'znx123456'){
        $('#login_container').css('visibility', 'hidden');
        alert('欢迎进入数据管理页面！');
        showData();
        $('#datamanager_container').css('visibility', 'visible');
    }
    else {
        alert('欢迎您参与测试！您的测试编号为：' + testNum);
        $('#login_container').css('visibility', 'hidden');
        testID = testNum;
        testCounter = 0;
        $('#mainFrame').css('visibility', 'visible');
        $('#test000_container').css('visibility', 'visible');
    }
}

