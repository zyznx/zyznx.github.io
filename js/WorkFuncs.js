function test001Btn() {
    var _teststr_ = $.ajax({
        type: 'GET',
        url: '/TestItemCollection/test001.html',
        async: false
    }).responseText;
    $('#testframe').html(_teststr_);
    $.getScript('/TestItemCollection/test001.js');
}

var data = new Array();
var testCounter = 0;

if(!(localStorage.data === undefined)){
    if(localStorage.data.length > 0){
        data = eval('(' + localStorage.data + ')');
    }
}


var testID = '';

var testList = new Array();

var tempData = {};


var testFunc001 = function () {
    alert('实验01：\n1.点击确定开始实验\n2.实验开始后，请迅速点击屏幕上出现的蓝色方块');
    tempData.test001 = {};
    tempData.test001.tarPositionX = [0, 1, 2, 2, 2, 1, 0, 0, 0];
    tempData.test001.tarPositionY = [0, 0, 0, 1, 2, 2, 2, 1, 0];
    tempData.test001.startPosition = [400, 400];
    tempData.test001.stepLength = 200;
    //$('#test001-target').attr('data-counter', '-1');
    tempData.test001.clickCounter = 0;
    tempData.testID = testID;
    tempData.test001.startISO = (new Date()).toISOString();
    tempData.test001.startTime = (new Date()).getTime();
    tempData.test001.intervalStack = [];
    tempData.test001.resultStack = [];
    $('#test001-target').css('left', tempData.test001.startPosition[0] + tempData.test001.tarPositionX[tempData.test001.clickCounter] * tempData.test001.stepLength + 'px');
    $('#test001-target').css('top', tempData.test001.startPosition[1] + tempData.test001.tarPositionY[tempData.test001.clickCounter] * tempData.test001.stepLength + 'px');
    $('#test001-target').click(function () {
        var clickTime = (new Date()).getTime() - tempData.test001.startTime;
        if(clickTime - tempData.test001.intervalStack[tempData.test001.intervalStack.length - 1] < 200){return;}
        tempData.test001.clickCounter++;
        if(tempData.test001.clickCounter < tempData.test001.tarPositionX.length){
            tempData.test001.intervalStack.push(clickTime);
            tempData.test001.resultStack.push(true);
            $('#test001-target').css('left', tempData.test001.startPosition[0] + tempData.test001.tarPositionX[tempData.test001.clickCounter] * tempData.test001.stepLength + 'px');
            $('#test001-target').css('top', tempData.test001.startPosition[1] + tempData.test001.tarPositionY[tempData.test001.clickCounter] * tempData.test001.stepLength + 'px');
        }
        else{
            var res = {};
            res.test = 'test001'
            res.testID = tempData.testID;
            res.startTime = tempData.test001.startISO;
            res.intervalStack = tempData.test001.intervalStack;
            res.resultStack = tempData.test001.resultStack;
            //tempData.test001 = undefined;
            testFinish(res);
            $('#test001_container').css('visibility', 'hidden');
        }
    });

    $('#test001_container').click(function () {
        var clickTime = (new Date()).getTime() - tempData.test001.startTime;
        if(clickTime - tempData.test001.intervalStack[tempData.test001.intervalStack.length - 1] < 200){return;}
        tempData.test001.clickCounter++;
        if(tempData.test001.clickCounter < tempData.test001.tarPositionX.length){
            tempData.test001.intervalStack.push(clickTime);
            tempData.test001.resultStack.push(false);
            $('#test001-target').css('left', tempData.test001.startPosition[0] + tempData.test001.tarPositionX[tempData.test001.clickCounter] * tempData.test001.stepLength + 'px');
            $('#test001-target').css('top', tempData.test001.startPosition[1] + tempData.test001.tarPositionY[tempData.test001.clickCounter] * tempData.test001.stepLength + 'px');
        }
        else{
            var res = {};
            res.test = 'test001'
            res.testID = tempData.testID;
            res.startTime = tempData.test001.startISO;
            res.intervalStack = tempData.test001.intervalStack;
            res.resultStack = tempData.test001.resultStack;
            //tempData.test001 = undefined;
            testFinish(res);
            $('#test001_container').css('visibility', 'hidden');
        }
    });

    $('#test001_container').css('visibility', 'visible');
}



testList.push(testFunc001);


function mainProcess() {
    if(testCounter < testList.length){
        testList[testCounter]();
    }
    else if(testCounter == testList.length){
        localStorage.data = JSON.stringify(data);
        alert('实验全部完成，谢谢您的参与！\n祝您身体健康，生活愉快！');
    }
}

function testFinish(testData) {
    data.push(testData);
    testCounter++;
    mainProcess();
}

function showData() {
    for(let i = 0; i < data.length; i++){
        $('#dataTable').append('<tr><td>' + data[i].startTime + '</td><td>' + data[i].testID + '</td><td>' + data[i].test + '</td></tr>');
    }
}

function dlBtnClick() {
    var saveStr = '';
    var fileName = 'data_' + (new Date()).toISOString().replace(/:/g, '').replace(/-/g, '').substr(0, 15) + '.txt';
    for(let i = 0; i < data.length; i++){
        saveStr += data[i].startTime;
        saveStr += '\t';
        saveStr += data[i].test;
        saveStr += '\t';
        saveStr += data[i].testID;
        saveStr += '\t';
        for(let j = 0; j < data[i].intervalStack.length; j++){
            saveStr += data[i].intervalStack[j];
            saveStr += '\t';
            saveStr += data[i].resultStack[j];
            saveStr += '\t'
        }
        saveStr += '\r\n';
    }


    var blob = new Blob([saveStr], {type: "text/plain;charset=utf-8"});
    saveAs(blob, fileName);
}