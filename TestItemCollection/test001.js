var _test001_TarSize_ = 40;
var _test001_intervalStack_ = new Array();
var _test001_startTime_ = 0;
var _test001_stopTime_ = 0;
var _test001_BoxW_ = 600;
var _test001_BoxH_ = 400;
//初始化完毕
function test001_setSBox() {
    _test001_BoxW_ = 600;
    _test001_BoxH_ = 400;
    $('#test001-dispbox').css('width', _test001_BoxW_ + 'px');
    $('#test001-dispbox').css('height', _test001_BoxH_ + 'px');
    $('#test001-dispbox').position({my:'center', at:'center+100', of:'#testframe'});
}

function test001_setMBox() {
    _test001_BoxW_ = 750;
    _test001_BoxH_ = 500;
    $('#test001-dispbox').css('width', _test001_BoxW_ + 'px');
    $('#test001-dispbox').css('height', _test001_BoxH_ + 'px');
    $('#test001-dispbox').position({my:'center', at:'center+100', of:'#testframe'});
}

function test001_setBBox() {
    _test001_BoxW_ = 900;
    _test001_BoxH_ = 600;
    $('#test001-dispbox').css('width', _test001_BoxW_ + 'px');
    $('#test001-dispbox').css('height', _test001_BoxH_ + 'px');
    $('#test001-dispbox').position({my:'center', at:'center+100', of:'#testframe'});
}

function test001_setSTar() {
    _test001_TarSize_ = 40;
    $('#test001-target').css('width', _test001_TarSize_ + 'px');
    $('#test001-target').css('height', _test001_TarSize_ + 'px');
}

function test001_setMTar() {
    _test001_TarSize_ = 60;
    $('#test001-target').css('width', _test001_TarSize_ + 'px');
    $('#test001-target').css('height', _test001_TarSize_ + 'px');
}

function test001_setBTar() {
    _test001_TarSize_ = 80;
    $('#test001-target').css('width', _test001_TarSize_ + 'px');
    $('#test001-target').css('height', _test001_TarSize_ + 'px');
}

function test001_Start() {
    $("#test001-target").css('visibility', 'hidden');
    if(_test001_intervalStack_.length < 20){//测试20次取平均值
        setTimeout(function () {
            $("#test001-target").css('left', (Math.random() * (_test001_BoxW_ - _test001_TarSize_)) + 'px');
            $("#test001-target").css('top', (Math.random() * (_test001_BoxH_ - _test001_TarSize_)) + 'px');
            $("#test001-target").css('visibility', 'visible');
            _test001_startTime_ = (new Date()).getTime();
        }, Math.random() * 2000);
    }
    else{
        var _test001_meanInterval_ = 0;
        for(let i = 0; i < 20; i++){
            _test001_meanInterval_ += _test001_intervalStack_[i];
        }
        _test001_meanInterval_ /= 20;
        alert('测试结束，您的平均反应时间为' + _test001_meanInterval_ + '毫秒！');
    }
}

$('.test001-button').button();
$('#test001-help').dialog({width: 600, height: 150});
test001_setSBox();
test001_setBTar();

$("#test001-target").click(function () {
    _test001_stopTime_ = (new Date()).getTime();
    _test001_intervalStack_.push(_test001_stopTime_ - _test001_startTime_);
    test001_Start();
});