function buttoncal(){
    const buttonNum = [];
    var index = 1
    buttonSign.forEach((i,s) =>{
        if(index==1||index==5||index==9||index==13||index==17){
            buttonNum.push(`<div class="btn-group" style="margin-left: 25px;  width:300px; height:80px; background-color:rgb(134, 46, 46);">`)
        }
        buttonNum.push(`<button value=${s} name=button${i} data-action=${i} class="btn btn-outline-danger font-monospace fs-4"  style="width:75px; height:80px;">${s}</button>`);
        if(index==4||index==8||index==12||index==16||index==20){
            buttonNum.push(`</div>`)
        }
        index++;    
    });
    keyboard.innerHTML = buttonNum.join('');   
}

function addNumber(number,inputValue){
    if(inputValue=="0"&&inputValue.length==1){
        document.getElementById("inputNum").value = number;
    }else{
        if(lastSign==true){
            document.getElementById("inputNum").value = number;
            lastSign=false;
        }else{
            document.getElementById("inputNum").value += number;
        }
    }
}

function count(sign,inputValue){
    if(lastSign!=true){
        components.push(inputValue);
        signEquation.push(sign);
        if(sign!="="){
            document.getElementById("equation").value += (parseFloat(inputValue)+sign);
        }
        if(signEquation.length==1){
            result = parseFloat(components[components.length-1]);
            var equation = document.getElementById("equation").value;
            if(sign=="="&&equation.length!=0){
                result += inputValue;
            }
        }else{
            if(signEquation[signEquation.length-2]=="+"){
                result += parseFloat(components[components.length-1]);
            }
            else if(signEquation[signEquation.length-2]=="-"){
                result -= parseFloat(components[components.length-1]);
            }
            else{
                if(signEquation[signEquation.length-3]=="-"){
                    result += parseFloat(components[components.length-2]);
                    if(signEquation[signEquation.length-2].charCodeAt(0)==215){
                        result -= parseFloat(components[components.length-2])*parseFloat(components[components.length-1]);
                    }else if(signEquation[signEquation.length-2].charCodeAt(0)==247){
                        result -= parseFloat(components[components.length-2])/parseFloat(components[components.length-1]);
                    }
                }else if(signEquation[signEquation.length-3]=="+"){
                    result -= parseFloat(components[components.length-2]);
                    if(signEquation[signEquation.length-2].charCodeAt(0)==215){
                        result += parseFloat(components[components.length-2])*parseFloat(components[components.length-1]);
                    }else if(signEquation[signEquation.length-2].charCodeAt(0)==247){
                        result += parseFloat(components[components.length-2])/parseFloat(components[components.length-1]);
                    }
                }
            }
            
        }
        document.getElementById("inputNum").value = result;
        lastSign = true;
    }
}

function clearArea(sign,inputValue){
    if(sign=="X"){
        document.getElementById("inputNum").value = inputValue.slice(0,inputValue.length-1);
        if(inputValue.length==1){
            document.getElementById("inputNum").value="0";
        }
    }else if(sign=="C"){
        document.getElementById("inputNum").value = "0";
        document.getElementById("equation").value = "";
    }else if(sign=="CE"){
        document.getElementById("inputNum").value = "0";
    }
    components.length=0;
    signEquation.length=0;
    result=0;
}

function addDot(inputValue){
    if(!inputValue.includes(".")){
        document.getElementById("inputNum").value+=".";
    }
    if(lastSign==true){
        document.getElementById("inputNum").value = "0.";
        lastSign = false;
    }
}

function gotoHistory(inputValue){
    lastSign=false;
    count("=",inputValue)
    document.getElementById("history").value += document.getElementById("equation").value+inputValue+"\n"+"="+result+"\n";
    document.getElementById("inputNum").value = 0;
    document.getElementById("equation").value = "";
    components.length=0;
    signEquation.length=0;
    result=0;
    lastSign=false;
}

function changeMark(){
    document.getElementById("inputNum").value ;
}

var buttonSign = new Map([["CE","clear"],["C","clear"],["X","clear"],["&#xF7","operator"],["7","number"],["8","number"],["9","number"],["&#xD7","operator"],
                          ["4","number"],["5","number"],["6","number"],["-","operator"],["1","number"],["2","number"],["3","number"],["+","operator"],
                          ["0","number"],[".","decimal"],["=","equal"]]);
const keyboard = document.getElementById('keyboard');
var components = [];
var signEquation = [];
var result = 0;
var lastSign = false;

keyboard.addEventListener("click", function (e){
    var inputValue = document.getElementById("inputNum").value;
    var element = e.target;
    var buttonValue = element.getAttribute('value');

    if(element.getAttribute('data-action')=="number"){
        addNumber(buttonValue,inputValue);
    }
    else if(element.getAttribute('data-action')=="clear"){
        clearArea(buttonValue,inputValue);
    }
    else if(element.getAttribute('data-action')=="decimal"){
        addDot(inputValue);
    }
    else if(element.getAttribute('data-action')=="equal"){
        gotoHistory(inputValue);
    }
    else if(element.getAttribute('data-action')=="equal"){
        changeMark(inputValue);
    }
    else{
        count(buttonValue,inputValue);
    }
});

buttoncal();
