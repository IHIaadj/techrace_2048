var board = new Array();
var score = 0;
var hasConflicted = new Array();
var winOnce = false;
$(document).ready(function(){
    setDimensions();
    newgame();
    hideDialog();
});

function hideDialog(){
    $(".dialog-success").css("display","none");
    $(".dialog-fail").css("display","none");
}

function setDimensions(){
    gridContainerWidth = 370;
    cellSpace = 10;
    cellSideLength = 80;
    
    $("#grid-container").css('width',gridContainerWidth-2*cellSpace);
    $("#grid-container").css('height',gridContainerWidth-2*cellSpace);
    $("#grid-container").css('padding',cellSpace);
    $("#grid-container").css('border-radius',0.02*gridContainerWidth);
    if(documentHeight*3/documentWidth>5){
        $('header').css('margin-top',cellSideLength);
    }
    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",0.02*cellSideLength);
}

function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();
    resetSocre();
}

function again(){
    newgame();
    hideDialog();
    resetSocre();
}

function conti(){
    hideDialog();
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    for(var i=0;i<4;i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j=0;j<4;j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    winOnce = false;
    score = 0;
    updateBoardView();
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){

            $("#grid-container").append('<div class = "number-cell" id = "number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+"-"+j);
            
            if(board[i][j]==0){
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
            }else{
                theNumberCell.css("width",cellSideLength+"px");
                theNumberCell.css("height",cellSideLength+"px");
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
                theNumberCell.css("background-color",getNumberCellBgColor(board[i][j]));
                theNumberCell.css("color",getNumberCellFontColor(board[i][j]));
                theNumberCell.css("font-size",getNumberCellFontSize(board[i][j]));
    
                theNumberCell.text(board[i][j]);
            }
            
            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height',cellSideLength+"px");
    
}

function generateOneNumber(){
    if(nospace(board)){
        return false;
    }

    var randomX = parseInt(Math.floor(Math.random()*4));
    var randomY = parseInt(Math.floor(Math.random()*4));
    
    while(true){
        if(board[randomX][randomY]==0){
            break;
        }
        var randomX = parseInt(Math.floor(Math.random()*4));
        var randomY = parseInt(Math.floor(Math.random()*4));
    }

    var randomNumber = Math.random()<0.5?2:4;

    board[randomX][randomY] = randomNumber;
    showNumberWithAnimation(randomX,randomY,randomNumber);
    
    return true;
}

$(document).keydown(function (event) {
  
  switch (event.keyCode) {
    case 37:
      event.preventDefault();
      if(moveLeft()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
      break;
    case 38: 
      event.preventDefault();
      if(moveUp()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
      break;
    case 39:
      event.preventDefault();
      if(moveRight()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
      break;
    case 40: 
        event.preventDefault();
        if(moveDown()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
      break;
    default:
      return; 
  }
});

document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
    event.preventDefault();
});

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    
    var deltax = endx - startx;
    var deltay = endy - starty;
    
    if(Math.abs(deltax) <0.2*documentWidth&& Math.abs(deltay)<0.2*documentWidth){
        return;
    }
    
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
            if(moveRight()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
        }else{
            if(moveLeft()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
        }
    }else{
        if(deltay > 0){
            if(moveDown()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
        }else{
            if(moveUp()){
                    setTimeout("generateOneNumber()",210);
                    setTimeout("isGameover()",300);
                    setTimeout("isWin()",300);
                }
        }
    }
});

function isGameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}

function isWin(){
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]==2048){
                if(winOnce==false){
                    win();
                    winOnce=true;
                }
            }
        }
    }
    return false;
}

function win(){
    $(".dialog-success").css("display","block");
}

function gameover(){
    $(".dialog-fail").css("display","block");
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noUpBlock(i,j,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noUpBlock(i,j,k,board)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        setTimeout("changeScore(score)",310);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noDownBlock(i,j,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noDownBlock(i,j,k,board)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        setTimeout("changeScore(score)",310);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0&&noRightBlock(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noRightBlock(i,j,k,board)&&!hasConflicted[i][k]){
                
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                   
                        score += board[i][k];
                        setTimeout("changeScore(score)",310);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
      
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noLeftBlock(i,j,k,board)){
                   
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noLeftBlock(i,j,k,board)&&!hasConflicted[i][k]){
                    
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        
                        score += board[i][k];
                        setTimeout("changeScore(score)",310);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


function showNumberWithAnimation(randomX,randomY,randomNumber){
    var numberCell = $("#number-cell-"+randomX+"-"+randomY);
    numberCell.css("background-color",getNumberCellBgColor(board[randomX][randomY]));
    numberCell.css("color",getNumberCellFontColor(board[randomX][randomY]));
    numberCell.css("font-size",getNumberCellFontSize(randomNumber));
    numberCell.text(randomNumber);

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(randomX,randomY),
        left:getPosLeft(randomX,randomY)
    },100);
    
}

function showMoveAnimation(fromX,fromY,toX,toY){
    var numberCell = $("#number-cell-"+fromX+"-"+fromY);
    numberCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY)
    },200);
}

function changeScore(score){
    $("#score").text(score);
}

function resetSocre(){
    $("#score").text(0);
}

documentWidth = window.screen.width;
documentHeight = window.screen.height;
gridContainerWidth = 0.92*documentWidth;
cellSideLength = 0.18*documentWidth;
cellSpace = 0.04*documentWidth;


function getPosTop(i,j){
    return cellSpace+i*(cellSpace+cellSideLength);
}

function getPosLeft(i,j){
    return cellSpace+j*(cellSpace+cellSideLength);
}

function getNumberCellBgColor(number){

    switch(number){
        case 2:return "#eee4da"; break;
        case 4:return "#ede0c8"; break;
        case 8:return "#f2b179"; break;
        case 16:return "#f59563"; break;
        case 32:return "#f67c5f"; break;
        case 64:return "#ec6544"; break;
        case 128:return "#e44d29"; break;
        case 256:return "#edcf72"; break;
        case 512:return "#c8a145"; break;
        case 1024:return "#a8832b"; break;
        case 2048:return "#86aa9c"; break;
        case 4096:return "#a6c"; break;
        case 8192:return "#791e6f"; break;
    }
    return "black";
    
}


function getNumberCellFontSize(number){
    if(number <= 64){
        return 0.6*cellSideLength+"px";
    }else if(number <= 512){
        return 0.5*cellSideLength+"px";
    }else if(number <=8192){
        return 0.4*cellSideLength+"px";
    }else{
        return 0.3*cellSideLength+"px";
    }
    return "white";
}

function getNumberCellFontColor(number){
    if(number <= 4){
        return "#776e65";
    }
    return "white";
}

function nospace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

function nomove(board){
    if(canMoveLeft()||canMoveDown()||canMoveRight()||canMoveUp()){
        return false;
    }
    return true;
}

function canMoveLeft(){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(){
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(){
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(){
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noLeftBlock(i,j,k,board){
    for(var m=k+1;m<j;m++){
        if(board[i][m]!=0){
            return false;
        }
    }
    return true;
}
function noRightBlock(i,j,k,board){
    for(var m=k-1;m>j;m--){
        if(board[i][m]!=0){
            return false;
        }
    }
    return true;
}
function noDownBlock(i,j,k,board){
    for(var m=k-1;m>i;m--){
        if(board[m][j]!=0){
            return false;
        }
    }
    return true;
}
function noUpBlock(i,j,k,board){
    for(var m=k+1;m<i;m++){
        if(board[m][j]!=0){
            return false;
        }
    }
    return true;
}
