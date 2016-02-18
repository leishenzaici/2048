
var board =new Array();//表示格子，放到数组里
var score = 0 ;//表示游戏分数

//加载文档的时候执行一个函数：newgame()
$(document).ready(function(){
	newgame();
});

//定义newgame函数
function newgame(){
	//初始化棋盘格
	init();
	//随机生成两个数字
	generateOneNumber();
	generateOneNumber();
}

//定义初始化棋盘格的函数
function init(){
	//遍历四乘四的方格
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			//通过id找到单个的棋盘格
			var gridCell = $("#grid-cell-"+i+"-"+j);
			//getPosTop计算并返回ij块距离顶端的距离
			gridCell.css( 'top' , getPosTop( i , j ) );
			//getPosLeft计算并返回ij块距离左端的距离
			gridCell.css( 'left' , getPosLeft( i , j ) );
		}
	}
	//定义每个小格子
	for( var i = 0 ; i < 4 ; i++ ){
		board[i]=new Array();
		for( var j = 0 ; j < 4 ; j ++ ){
			board[i][j] = 0 ;
		}
	}
	//刷新页面,对显示上的设定通知前端
	updateBoardView();
	score = 0 ;
}
//定义对显示上的设定通知前端的函数的函数
function updateBoardView(){
	//删除已经存在的有数字的格子
	$(".number-cell").remove();
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			//找到四乘四的方格，为每一个方格建立一个数字格子元素
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			//把当前数字方格赋值给theNumberCell
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			//如果显示的数字是0的话就透明
			if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+50);
				theNumberCell.css('left',getPosLeft(i,j)+50);
			}else{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
	}
}

function generateOneNumber(){
	//判断是否还有空的
	if( nospace( board ) )
		return false;
	//随机产生一个位置
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	//让这个随机位置可用
	while(true){
		//如果这个位置可用，退出循环
		if(board[randx][randy]==0){
			break;
		}
		//如果位置不可用，接着循环
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
	}
	//随机产生一个数字
	var randNumber=Math.random()<0.5?2:4;
	//在随机位置显示随机数字
	board [randx][randy]=randNumber;
	//动画效果展示这个新随机产生的数
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
	//left-->A
	case 65:
		//如果可以向左移动
		if(moveLeft()){

			setTimeout("generateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
	//up-->W
	case 87:
		//如果可以向上移动
		if(moveUp()){
			setTimeout("generateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
	//right-->D
	case 68:
		if(moveRight()){
			setTimeout("generateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
	//down-->S
	case 83:
		//如果可以向下移动
		if(moveDown()){
			//随机生成一个带数字的格子并显示
			setTimeout("generateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
	default:
		break;
	}
})

function isgameover(){
	if( nospace( board ) && nomove( board ) ){
		gameover();
	}
}

function gameover(){
	alert("gameover!!!");
}

function moveLeft(){
	
	if(!canMoveLeft(board)){
		return false;
	}
	
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 1 ; j < 4 ; j ++ ){
			if(board[i][j]!=0){
				for( var k = 0 ; k < j ; k ++ ){
					if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ){
						
						showMoveAnimation( i , j , i , k );
						
						board[i][k] = board[i][j];
						board[i][j]=0;
						break;
					}else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board )){
						showMoveAnimation( i , j , i , k );
	
						board[i][k] += board[i][j];
						board[i][j]=0;

						score += board[i][k];
						updateScore(score);
						break;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()",200);
	return true;
}


function moveUp(){
	
	if(!canMoveUp(board)){
		return false;
	}
	for( var i = 1 ; i < 4 ; i ++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			if(board[i][j]!=0){
				for( var k = 0 ; k < i ; k ++ ){
					
					if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
						showMoveAnimation( i , j , k , j );
				
						board[k][j] = board[i][j];
						board[i][j]=0;
						break;
					}else if( board[k][j] == board [i][j] && noBlockVertical( j , k , i , board ) ){
						
						showMoveAnimation( i , j , k , j );
	
						board[k][j] += board[i][j];
						board[i][j]=0;
                        
						score += board[k][j];
						updateScore(score);
						break;
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
	
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 2 ; j >= 0 ; j -- ){
			if(board[i][j]!=0){
				for( var k = 3 ; k > j ; k -- ){
					if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){

						showMoveAnimation( i , j , i , k );

						board[i][k] = board[i][j];
						board[i][j]=0;
						break;
					}else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board )){
						
						showMoveAnimation( i , j , i , k );
						
						board[i][k] += board[i][j];
						board[i][j]=0;
						score += board[i][k];
						updateScore(score);
						break;
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
	
	for( var i = 2 ; i >= 0 ; i -- ){
		for( var j = 0 ; j < 4 ; j ++ ){
			if(board[i][j]!=0){
				for( var k = 3 ; k > i ; k -- ){
				
					if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
						showMoveAnimation( i , j , k , j );
						board[k][j] = board[i][j];
						board[i][j]=0;
						break;
					}else if( board[k][j] == board [i][j] && noBlockVertical( j , i , k , board ) ){
						
						showMoveAnimation( i , j , k , j );

						board[k][j] += board[i][j];
						board[i][j]=0;
						score += board[k][j];
						updateScore(score);
						break;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
