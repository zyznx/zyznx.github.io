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

var testClick = function (testObj) {
    $('#test000_container').css('visibility', 'hidden');
    $('#' + testObj.name + 'Btn').css('color','rgb(255,194,0)');
    alert('实验' + testObj.test + '内容：\n1.点击确定开始实验\n2.实验开始后，请迅速点击屏幕上出现的蓝色方块');
    tempData[testObj.name] = {};
    tempData[testObj.name].tarPositionX = testObj.tarPositionX;
    tempData[testObj.name].tarPositionY = testObj.tarPositionY;
    tempData[testObj.name].tarDirection = testObj.tarDirection;
    tempData[testObj.name].startPosition = testObj.startPosition;
    tempData[testObj.name].stepLength = testObj.stepLength;
    //$('#' + testObj.name + '-target').attr('data-counter', '-1');
    tempData[testObj.name].clickCounter = 0;
    tempData.testID = testID;
    tempData[testObj.name].startISO = (new Date()).toISOString();
    tempData[testObj.name].startTime = (new Date()).getTime();
    tempData[testObj.name].intervalStack = [];
    tempData[testObj.name].resultStack = [];
    $('#' + testObj.name + '-target').css('left', tempData[testObj.name].startPosition[0] + tempData[testObj.name].tarPositionX[tempData[testObj.name].clickCounter] * tempData[testObj.name].stepLength + 'px');
    $('#' + testObj.name + '-target').css('top', tempData[testObj.name].startPosition[1] + tempData[testObj.name].tarPositionY[tempData[testObj.name].clickCounter] * tempData[testObj.name].stepLength + 'px');
    $('#' + testObj.name + '-target').click(function () {
        var clickTime = (new Date()).getTime() - tempData[testObj.name].startTime;
        if(clickTime - tempData[testObj.name].intervalStack[tempData[testObj.name].intervalStack.length - 1] < 200){return;}
        tempData[testObj.name].clickCounter++;
        if(tempData[testObj.name].clickCounter < tempData[testObj.name].tarPositionX.length){
            tempData[testObj.name].intervalStack.push(clickTime);
            tempData[testObj.name].resultStack.push(true);
            $('#' + testObj.name + '-target').css('left', tempData[testObj.name].startPosition[0] + tempData[testObj.name].tarPositionX[tempData[testObj.name].clickCounter] * tempData[testObj.name].stepLength + 'px');
            $('#' + testObj.name + '-target').css('top', tempData[testObj.name].startPosition[1] + tempData[testObj.name].tarPositionY[tempData[testObj.name].clickCounter] * tempData[testObj.name].stepLength + 'px');
        }
        else{
            tempData[testObj.name].intervalStack.push(clickTime);
            tempData[testObj.name].resultStack.push(true);
            var res = {};
            res.test = testObj.test;
            res.testID = tempData.testID;
            res.startTime = tempData[testObj.name].startISO;
            res.tarDirection = tempData[testObj.name].tarDirection;

            res.intervalStack = new Array();
            res.resultStack = new Array();
            for(let i = 0; i < res.tarDirection.length; i++){
                res.resultStack.push(tempData[testObj.name].resultStack[i + 1]);
                res.intervalStack.push(tempData[testObj.name].intervalStack[i + 1] - tempData[testObj.name].intervalStack[i]);
            }
            testFinish(res);
            $('#' + testObj.name + '_container').css('visibility', 'hidden');
        }
    });

    $('#' + testObj.name + '_container').click(function () {
        var clickTime = (new Date()).getTime() - tempData[testObj.name].startTime;
        if(clickTime - tempData[testObj.name].intervalStack[tempData[testObj.name].intervalStack.length - 1] < 200){return;}
        tempData[testObj.name].clickCounter++;
        if(tempData[testObj.name].clickCounter < tempData[testObj.name].tarPositionX.length){
            tempData[testObj.name].intervalStack.push(clickTime);
            tempData[testObj.name].resultStack.push(false);
            $('#' + testObj.name + '-target').css('left', tempData[testObj.name].startPosition[0] + tempData[testObj.name].tarPositionX[tempData[testObj.name].clickCounter] * tempData[testObj.name].stepLength + 'px');
            $('#' + testObj.name + '-target').css('top', tempData[testObj.name].startPosition[1] + tempData[testObj.name].tarPositionY[tempData[testObj.name].clickCounter] * tempData[testObj.name].stepLength + 'px');
        }
        else{
            tempData[testObj.name].intervalStack.push(clickTime);
            tempData[testObj.name].resultStack.push(false);
            var res = {};
            res.test = testObj.test;
            res.testID = tempData.testID;
            res.startTime = tempData[testObj.name].startISO;
            res.tarDirection = tempData[testObj.name].tarDirection;

            res.intervalStack = new Array();
            res.resultStack = new Array();
            for(let i = 0; i < res.tarDirection.length; i++){
                res.resultStack.push(tempData[testObj.name].resultStack[i + 1]);
                res.intervalStack.push(tempData[testObj.name].intervalStack[i + 1] - tempData[testObj.name].intervalStack[i]);
            }
            testFinish(res);
            $('#' + testObj.name + '_container').css('visibility', 'hidden');
        }
    });

    $('#' + testObj.name + '_container').css('visibility', 'visible');
};

var testDrag = function (testObj) {
    $('#test000_container').css('visibility', 'hidden');
    $('#' + testObj.name + 'Btn').css('color','rgb(255,194,0)');
    alert('实验' + testObj.test + '内容：\n1.点击确定开始实验\n2.实验开始后，请将屏幕上出现的蓝色方块拖放于绿色方框中');

    tempData[testObj.name] = {};
    tempData[testObj.name].tarPositionX = testObj.tarPositionX;
    tempData[testObj.name].tarPositionY = testObj.tarPositionY;
    tempData[testObj.name].tarDirection = testObj.tarDirection;
    tempData[testObj.name].startPosition = testObj.startPosition;
    tempData[testObj.name].stepLength = testObj.stepLength;
    tempData[testObj.name].clickCounter = 0;
    tempData.testID = testID;
    tempData[testObj.name].startISO = (new Date()).toISOString();

    tempData[testObj.name].intervalStack = [];
    tempData[testObj.name].resultStack = [];
    $('#' + testObj.name + '-target').draggable();
    $('#' + testObj.name + '-target').css('left', tempData[testObj.name].startPosition[0] + tempData[testObj.name].tarPositionX[0] * tempData[testObj.name].stepLength + 'px');
    $('#' + testObj.name + '-target').css('top', tempData[testObj.name].startPosition[1] + tempData[testObj.name].tarPositionY[0] * tempData[testObj.name].stepLength + 'px');
    $('#' + testObj.name + '-box').css('left', tempData[testObj.name].startPosition[0] + tempData[testObj.name].tarPositionX[1] * tempData[testObj.name].stepLength + 'px');
    $('#' + testObj.name + '-box').css('top', tempData[testObj.name].startPosition[1] + tempData[testObj.name].tarPositionY[1] * tempData[testObj.name].stepLength + 'px');

    $('#' + testObj.name + '-target').mousedown(function () {
        tempData[testObj.name].dragging = true;
        if(tempData[testObj.name].clickCounter == 0){
            tempData[testObj.name].startTime = (new Date()).getTime();
        }
    });
    $('#' + testObj.name + '-target').mouseup(function () {
        if(tempData[testObj.name].dragging){
            tempData[testObj.name].dragging = false;

            var clickTime = (new Date()).getTime() - tempData[testObj.name].startTime;
            tempData[testObj.name].intervalStack.push(clickTime);

            var targetPos = $('#' + testObj.name + '-target').position();
            var boxPos = $('#' + testObj.name + '-box').position();
            if((Math.abs(targetPos.left - boxPos.left) > testObj.errSize) || (Math.abs(targetPos.top - boxPos.top) > testObj.errSize)){tempData[testObj.name].resultStack.push(false);}
            else{tempData[testObj.name].resultStack.push(true);}

            tempData[testObj.name].clickCounter++;

            if(tempData[testObj.name].clickCounter < tempData[testObj.name].tarDirection.length){
                $('#' + testObj.name + '-box').css('left', tempData[testObj.name].startPosition[0] + tempData[testObj.name].tarPositionX[tempData[testObj.name].clickCounter + 1] * tempData[testObj.name].stepLength + 'px');
                $('#' + testObj.name + '-box').css('top', tempData[testObj.name].startPosition[1] + tempData[testObj.name].tarPositionY[tempData[testObj.name].clickCounter + 1] * tempData[testObj.name].stepLength + 'px');
            }
            else{
                var res = {};
                res.test = testObj.test;
                res.testID = tempData.testID;
                res.startTime = tempData[testObj.name].startISO;
                res.tarDirection = tempData[testObj.name].tarDirection;

                res.intervalStack = new Array();
                res.intervalStack.push(tempData[testObj.name].intervalStack[0]);
                res.resultStack = tempData[testObj.name].resultStack;

                for(let i = 1; i < tempData[testObj.name].intervalStack.length; i++){
                    res.intervalStack.push(tempData[testObj.name].intervalStack[i] - tempData[testObj.name].intervalStack[i - 1]);
                }

                testFinish(res);
                $('#' + testObj.name + '_container').css('visibility', 'hidden');
            }
        }
    });

    $('#' + testObj.name + '_container').css('visibility', 'visible');
}
//testList.push(testFunc001);

var test001Click = function () {
    var testObj = {};
    testObj.name = 'test001';
    testObj.tarPositionX = [0, 1, 2, 2, 2, 1, 0, 0, 0];
    testObj.tarPositionY = [0, 0, 0, 1, 2, 2, 2, 1, 0];
    testObj.tarDirection = ['R', 'R', 'D', 'D', 'L', 'L', 'U', 'U'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Click001';
    testClick(testObj);
};

var test002Click = function () {
    var testObj = {};
    testObj.name = 'test002';
    testObj.tarPositionX = [0, 0, 0, 1, 2, 2, 2, 1, 0];
    testObj.tarPositionY = [0, 1, 2, 2, 2, 1, 0, 0, 0];
    testObj.tarDirection = ['D', 'D', 'R', 'R', 'U', 'U', 'L', 'L'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Click002';
    testClick(testObj);
};

var test003Click = function () {
    var testObj = {};
    testObj.name = 'test003';
    testObj.tarPositionX = [0, 1, 2, 1.293, 0.586, 1.586, 2.586, 1.879, 1.172];
    testObj.tarPositionY = [0, 0, 0, 0.707, 1.414, 1.414, 1.414, 0.707, 0];
    testObj.tarDirection = ['R', 'R', 'LD', 'LD', 'R', 'R', 'LU', 'LU'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Click003';
    testClick(testObj);
};

var test004Click = function () {
    var testObj = {};
    testObj.name = 'test004';
    testObj.tarPositionX = [0, 0.707, 1.414, 0.414, -0.586, 0.121, 0.828, -0.172, -1.172];
    testObj.tarPositionY = [0, 0.707, 1.414, 1.414, 1.414, 0.707, 0, 0, 0];
    testObj.tarDirection = ['RD', 'RD', 'L', 'L', 'RU', 'RU', 'L', 'L'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Click004';
    testClick(testObj);
};

var test005Click = function () {
    var testObj = {};
    testObj.name = 'test005';
    testObj.tarPositionX = [0, 0, 0, 0.707, 1.414, 1.414, 1.414, 0.707, 0];
    testObj.tarPositionY = [0, 1, 2, 1.293, 0.586, 1.586, 2.586, 1.879, 1.172];
    testObj.tarDirection = ['D', 'D', 'RU', 'RU', 'D', 'D', 'LU', 'LU'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Click005';
    testClick(testObj);
};

var test006Click = function () {
    var testObj = {};
    testObj.name = 'test006';
    testObj.tarPositionX = [0, 0.707, 1.414, 1.414, 1.414, 0.707, 0, 0, 0];
    testObj.tarPositionY = [0, 0.707, 1.414, 0.414, -0.586, 0.121, 0.828, -0.172, -1.172];
    testObj.tarDirection = ['RD', 'RD', 'U', 'U', 'LD', 'LD', 'U', 'U'];
    testObj.startPosition = [600, 400];
    testObj.stepLength = 200;
    testObj.test = 'Click006';
    testClick(testObj);
};

var test007Click = function () {
    var testObj = {};
    testObj.name = 'test007';
    testObj.tarPositionX = [0, -0.707, 0, 0.707, 0, -0.707, 0, 0.707, 0];
    testObj.tarPositionY = [0, -0.707, 0, 0.707, 0, 0.707, 0, -0.707, 0];
    testObj.tarDirection = ['LU', 'RD', 'RD', 'LU', 'LD', 'RU', 'RU', 'LD'];
    testObj.startPosition = [800, 400];
    testObj.stepLength = 200;
    testObj.test = 'Click007';
    testClick(testObj);
};

var test008Click = function () {
    var testObj = {};
    testObj.name = 'test008';
    testObj.tarPositionX = [0, -0.707, 0, 0.707, 0, 0.707, 0, -0.707, 0];
    testObj.tarPositionY = [0, -0.707, 0, -0.707, 0, 0.707, 0, 0.707, 0];
    testObj.tarDirection = ['LU', 'RD', 'RU', 'LD', 'RD', 'LU', 'LD', 'RU'];
    testObj.startPosition = [800, 400];
    testObj.stepLength = 200;
    testObj.test = 'Click008';
    testClick(testObj);
};

var test009Click = function () {
    var testObj = {};
    testObj.name = 'test009';
    testObj.tarPositionX = [0, 1, 2, 2, 2, 1, 0, 0, 0];
    testObj.tarPositionY = [0, 0, 0, 1, 2, 2, 2, 1, 0];
    testObj.tarDirection = ['R', 'R', 'D', 'D', 'L', 'L', 'U', 'U'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Drag001';
    testObj.errSize = 5;
    testDrag(testObj);
};

var test010Click = function () {
    var testObj = {};
    testObj.name = 'test010';
    testObj.tarPositionX = [0, 0, 0, 1, 2, 2, 2, 1, 0];
    testObj.tarPositionY = [0, 1, 2, 2, 2, 1, 0, 0, 0];
    testObj.tarDirection = ['D', 'D', 'R', 'R', 'U', 'U', 'L', 'L'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Drag002';
    testObj.errSize = 5;
    testDrag(testObj);
};

var test011Click = function () {
    var testObj = {};
    testObj.name = 'test011';
    testObj.tarPositionX = [0, 1, 2, 1.293, 0.586, 1.586, 2.586, 1.879, 1.172];
    testObj.tarPositionY = [0, 0, 0, 0.707, 1.414, 1.414, 1.414, 0.707, 0];
    testObj.tarDirection = ['R', 'R', 'LD', 'LD', 'R', 'R', 'LU', 'LU'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Drag003';
    testObj.errSize = 5;
    testDrag(testObj);
};

var test012Click = function () {
    var testObj = {};
    testObj.name = 'test012';
    testObj.tarPositionX = [0, 0.707, 1.414, 0.414, -0.586, 0.121, 0.828, -0.172, -1.172];
    testObj.tarPositionY = [0, 0.707, 1.414, 1.414, 1.414, 0.707, 0, 0, 0];
    testObj.tarDirection = ['RD', 'RD', 'L', 'L', 'RU', 'RU', 'L', 'L'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Drag004';
    testObj.errSize = 5;
    testDrag(testObj);
};

var test013Click = function () {
    var testObj = {};
    testObj.name = 'test013';
    testObj.tarPositionX = [0, 0, 0, 0.707, 1.414, 1.414, 1.414, 0.707, 0];
    testObj.tarPositionY = [0, 1, 2, 1.293, 0.586, 1.586, 2.586, 1.879, 1.172];
    testObj.tarDirection = ['D', 'D', 'RU', 'RU', 'D', 'D', 'LU', 'LU'];
    testObj.startPosition = [600, 200];
    testObj.stepLength = 200;
    testObj.test = 'Drag005';
    testObj.errSize = 5;
    testDrag(testObj);
};

var test014Click = function () {
    var testObj = {};
    testObj.name = 'test014';
    testObj.tarPositionX = [0, 0.707, 1.414, 1.414, 1.414, 0.707, 0, 0, 0];
    testObj.tarPositionY = [0, 0.707, 1.414, 0.414, -0.586, 0.121, 0.828, -0.172, -1.172];
    testObj.tarDirection = ['RD', 'RD', 'U', 'U', 'LD', 'LD', 'U', 'U'];
    testObj.startPosition = [600, 400];
    testObj.stepLength = 200;
    testObj.test = 'Drag006';
    testObj.errSize = 5;
    testDrag(testObj);
};

var test015Click = function () {
    var testObj = {};
    testObj.name = 'test015';
    testObj.tarPositionX = [0, -0.707, 0, 0.707, 0, -0.707, 0, 0.707, 0];
    testObj.tarPositionY = [0, -0.707, 0, 0.707, 0, 0.707, 0, -0.707, 0];
    testObj.tarDirection = ['LU', 'RD', 'RD', 'LU', 'LD', 'RU', 'RU', 'LD'];
    testObj.startPosition = [800, 400];
    testObj.stepLength = 200;
    testObj.test = 'Drag007';
    testObj.errSize = 5;
    testDrag(testObj);
};

var test016Click = function () {
    var testObj = {};
    testObj.name = 'test016';
    testObj.tarPositionX = [0, -0.707, 0, 0.707, 0, 0.707, 0, -0.707, 0];
    testObj.tarPositionY = [0, -0.707, 0, -0.707, 0, 0.707, 0, 0.707, 0];
    testObj.tarDirection = ['LU', 'RD', 'RU', 'LD', 'RD', 'LU', 'LD', 'RU'];
    testObj.startPosition = [800, 400];
    testObj.stepLength = 200;
    testObj.test = 'Drag008';
    testObj.errSize = 5;
    testDrag(testObj);
};

function testFinish(testData) {
    data.push(testData);
    testCounter++;
    localStorage.data = JSON.stringify(data);
    $('#test000_container').css('visibility', 'visible');
}

function showData() {
    for(let i = 0; i < data.length; i++){
        $('#dataTable').append('<tr><td>' + data[i].startTime + '</td><td>' + data[i].testID + '</td><td>' + data[i].test + '</td></tr>');
    }
    var datasize;
    if(localStorage.data === undefined){datasize = 0;}
    else{datasize = localStorage.data.length * 2 / 1024;}
    $('#dataSize').html(datasize + 'KB');
}

function dlBtnClick() {
    var saveStr = '';
    var fileName = 'data_' + (new Date()).toISOString().replace(/:/g, '').replace(/-/g, '').substr(0, 15) + '.csv';
    for(let i = 0; i < data.length; i++){
        saveStr += data[i].startTime;
        saveStr += ',';
        saveStr += data[i].test;
        saveStr += ',';
        saveStr += data[i].testID;
        saveStr += ',';
        for(let j = 0; j < data[i].intervalStack.length; j++){
            saveStr += data[i].tarDirection[j];
            saveStr += ',';
            saveStr += data[i].intervalStack[j];
            saveStr += ',';
            saveStr += data[i].resultStack[j];
            saveStr += ','
        }
        saveStr += '\r\n';
    }


    var blob = new Blob([saveStr], {type: "text/plain;charset=utf-8"});
    saveAs(blob, fileName);
}

function cleanBtnClick() {
    localStorage.clear();
    data = new Array();
    alert('数据已清理完毕！')
}