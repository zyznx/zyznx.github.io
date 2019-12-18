function test001Btn() {
    var _teststr_ = $.ajax({
        type: 'GET',
        url: '/TestItemCollection/test001.html',
        async: false
    }).responseText;
    $('#testframe').html(_teststr_);
    $.getScript('/TestItemCollection/test001.js');
}