
var board =new Array();//表示格子，放到数组里
var score = 0 ;//表示游戏分数
var hasConflicted =new Array();//表示每一个格子是否发生变化

//手势的四个坐标
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

//加载文档的时候执行一个函数：newgame()
$(document).ready(function(){
	//在移动端的游戏的一些设置
	prepareForMobile();
	newgame();
});

//定义在移动端的游戏的一些设置的函数
function prepareForMobile(){
	if(documentWidth>500){
	gridContainerWidth=500;
	cellSideLength=100;
	cellSpace=20;
	}
	//定义大方块的宽
	$('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
	//定义大方块的高
	$('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
	//定义大方块的边框大小
	$('#grid-container').css('padding', cellSpace);
	//定义大方块的圆角的大小
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);
	//定义小方块的宽
	$('.grid-cell').css('width',cellSideLength);
	//定义小方块的高
	$('.grid-cell').css('height',cellSideLength);
	//定义小方块的圆角的大小
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
}

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
	//定义每个小格子,并定义他们初试时每一个都没有经过碰撞
	for( var i = 0 ; i < 4 ; i++ ){
		board[i]=new Array();
		hasConflicted[i] =new Array();
		for( var j = 0 ; j < 4 ; j ++ ){
			//设定每个小格子的值为0
			board[i][j] = 0 ;
			//设定每个小格子都没有被碰撞过
			hasConflicted[i][j] = false ;
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
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			//设定每个小格子都没有被碰撞过
			hasConflicted[i][j] = false ;
		}
	}
	$(".number-cell").css('line-height',cellSideLength+'px');
	$(".number-cell").css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){
	//判断是否还有空的
	if( nospace( board ) )
		return false;
	//随机产生一个位置
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	//定义一个次数
	var times = 0;
	//让这个随机位置可用
	while(times<50){
		//如果这个位置可用，退出循环
		if(board[randx][randy]==0){
			break;
		}
		//如果位置不可用，接着循环
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
		//次数加一
		times++;
	}
	//如果循环了50次，还没有break，就指定一个随机位置
	if(times==50){
		for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			if(board[i][j]==0){
				randx = i;
				randy = j;
			}
		}
	}
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
	case 37:
		//取消按键的默认效果
		event.preventDefault();
		//如果可以向左移动
		if(moveLeft()){
			//随机生成一个带数字的格子并显示
			setTimeout("generateOneNumber()",210);
			//判断是否游戏结束
			setTimeout("isgameover()",300);
		}
		break;
	//up-->W
	case 38:
		//取消按键的默认效果
		event.preventDefault();
		//如果可以向上移动
		if(moveUp()){
			//随机生成一个带数字的格子并显示
			setTimeout("generateOneNumber()",210);
			//判断是否游戏结束
			setTimeout("isgameover()",300);
		}
		break;
	//right-->D
	case 39:
		//取消按键的默认效果
		event.preventDefault();
		//如果可以向右移动
		if(moveRight()){
			//随机生成一个带数字的格子并显示
			setTimeout("generateOneNumber()",210);
			//判断是否游戏结束
			setTimeout("isgameover()",300);
		}
		break;
	//down-->S
	case 40:
		//取消按键的默认效果
		event.preventDefault();
		//如果可以向下移动
		if(moveDown()){
			//随机生成一个带数字的格子并显示
			setTimeout("generateOneNumber()",210);
			//判断是否游戏结束
			setTimeout("isgameover()",300);
		}
		break;
	//其他
	default:
		break;
	}
})

//定义手势点击事件监听器函数
document.addEventListener('touchstart',function(event){
	//获取滑动时开始的点的坐标
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

//定义手势移动事件监听器函数，取消某些情况下的移动的默认处理
document.addEventListener('touchmove',function(event){
	event.preventDefault();
});

document.addEventListener('touchend',function(event){
	//获取滑动时结束的点的坐标
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	//x轴和y轴移动的距离
	var deltax = endx - startx;
	var deltay = endy - starty;
	//判断发生的是点击还是滑动，如果是点击，那么x和y的位移应该很小，那么就返回
	if(Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth ){
		return ;
	}
	//如果横的方向的距离大于竖的方向，那么就是在x轴上滑动，向左或者向右
	if( Math.abs( deltax ) >= Math.abs( deltay ) ){
		//如果移动的x大于0，就是向右,否则向左
		if( deltax > 0 ){
			//如果可以向右移动
			if(moveRight()){
				//随机生成一个带数字的格子并显示
				setTimeout("generateOneNumber()",210);
				//判断是否游戏结束
				setTimeout("isgameover()",300);
			}
		}else{
			//如果可以向左移动
			if(moveLeft()){
				//随机生成一个带数字的格子并显示
				setTimeout("generateOneNumber()",210);
				//判断是否游戏结束
				setTimeout("isgameover()",300);
			}
		}
	}else{//否则就是在y轴上滑动，向上或者向下
		//如果移动的y大于0，就是向下，否则向上
		if( deltay > 0 ){
			//如果可以向下移动
			if(moveDown()){
				//随机生成一个带数字的格子并显示
				setTimeout("generateOneNumber()",210);
				//判断是否游戏结束
				setTimeout("isgameover()",300);
			}
		}else{
			//如果可以向上移动
			if(moveUp()){
				//随机生成一个带数字的格子并显示
				setTimeout("generateOneNumber()",210);
				//判断是否游戏结束
				setTimeout("isgameover()",300);
			}
		}
	}
});


//定义判断游戏是否结束
function isgameover(){
	//如果整体没有空格了，并且整体不能移动了，则游戏结束
	if( nospace( board ) && nomove( board ) ){
		gameover();
	}
}

//定义游戏结束函数
function gameover(){
	alert("gameover!!!");
}

//定义向左移动的函数，如果不能向左移动，返回false
function moveLeft(){
	//如果当前不可以向左移动
	if(!canMoveLeft(board)){
		return false;
	}
	//如果可以移动，就移动他
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 1 ; j < 4 ; j ++ ){
			//如果当前小格子不是0，就有可能可以进行移动
			if(board[i][j]!=0){
				//当前小格子和他左边的每一个格子比较
				for( var k = 0 ; k < j ; k ++ ){
					//如果i，k小格子是0并且i，j小格子和i，k小格子中间没有障碍，则移动j到k
					if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ){
						//移动小方格的动画效果
						showMoveAnimation( i , j , i , k );
						//目的小方格改变的值
						board[i][k] = board[i][j];
						//原小方格取消掉
						board[i][j]=0;
						break;
					}else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][k] ){
						//移动小方格的动画效果
						showMoveAnimation( i , j , i , k );
						//改变目的小方格的值
						board[i][k] += board[i][j];
						//原小方格取消掉
						board[i][j]=0;
						//加分
						score += board[i][k];
						//把加分通知前台
						updateScore(score);
						//设定这个位置发生了碰撞
						hasConflicted[i][k] = true;
						break;
					}
				}
			}
		}
	}
	//刷新页面,对显示上的设定通知前端
	setTimeout("updateBoardView()",200);
	return true;
}


//定义向上移动的函数，如果不能向上移动，返回false
function moveUp(){
	//如果当前不可以向上移动
	if(!canMoveUp(board)){
		return false;
	}
	//如果可以移动，就移动他
	for( var i = 1 ; i < 4 ; i ++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			//如果当前小格子不是0，就有可能可以进行移动
			if(board[i][j]!=0){
				//当前小格子和他上边的每一个格子比较
				for( var k = 0 ; k < i ; k ++ ){
					//如果i，k小格子是0并且k，j小格子和i，k小格子中间没有障碍，则移动j到k
					if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
						//移动小方格的动画效果
						showMoveAnimation( i , j , k , j );
						//目的小方格改变的值
						board[k][j] = board[i][j];
						//原小方格取消掉
						board[i][j]=0;
						break;
					}else if( board[k][j] == board [i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
						//移动小方格的动画效果
						showMoveAnimation( i , j , k , j );
						//目的小方格改变的值
						board[k][j] += board[i][j];
						//原小方格取消掉
						board[i][j]=0;
						//加分
						score += board[k][j];
						//把加分通知前台
						updateScore(score);
						//设定这个位置发生了碰撞
						hasConflicted[k][j] = true;
						break;
					}
				}
			}
		}
	}
	//刷新页面,对显示上的设定通知前端
	setTimeout("updateBoardView()",200);
	return true;
}

//定义向右移动的函数，如果不能向右移动，返回false
function moveRight(){
	//如果当前不可以向上移动
	if(!canMoveRight(board)){
		return false;
	}
	//如果可以移动，就移动他
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 2 ; j >= 0 ; j -- ){
			//如果当前小格子不是0，就有可能可以进行移动
			if(board[i][j]!=0){
				//当前小格子和他上边的每一个格子比较
				for( var k = 3 ; k > j ; k -- ){
					//如果i，k小格子是0并且i，j小格子和i，k小格子中间没有障碍，则移动j到k
					if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
						//移动小方格的动画效果
						showMoveAnimation( i , j , i , k );
						//目的小方格改变的值
						board[i][k] = board[i][j];
						//原小方格取消掉
						board[i][j]=0;
						break;
					}else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
						//移动小方格的动画效果
						showMoveAnimation( i , j , i , k );
						//改变目的小方格的值
						board[i][k] += board[i][j];
						//原小方格取消掉
						board[i][j]=0;
						//加分
						score += board[i][k];
						//把加分通知前台
						updateScore(score);
						//设定这个位置发生了碰撞
						hasConflicted[i][k] = true;
						break;
					}
				}
			}
		}
	}
	//刷新页面,对显示上的设定通知前端
	setTimeout("updateBoardView()",200);
	return true;
}


//定义向下移动的函数，如果不能向下移动，返回false
function moveDown(){
	//如果当前不可以向下移动
	if(!canMoveDown(board)){
		return false;
	}
	//如果可以移动，就移动他
	for( var i = 2 ; i >= 0 ; i -- ){
		for( var j = 0 ; j < 4 ; j ++ ){
			//如果当前小格子不是0，就有可能可以进行移动
			if(board[i][j]!=0){
				//当前小格子和他上边的每一个格子比较
				for( var k = 3 ; k > i ; k -- ){
					//如果i，k小格子是0并且k，j小格子和i，k小格子中间没有障碍，则移动j到k
					if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
						//移动小方格的动画效果
						showMoveAnimation( i , j , k , j );
						//目的小方格改变的值
						board[k][j] = board[i][j];
						//原小方格取消掉
						board[i][j]=0;
						break;
					}else if( board[k][j] == board [i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
						//移动小方格的动画效果
						showMoveAnimation( i , j , k , j );
						//目的小方格改变的值
						board[k][j] += board[i][j];
						//原小方格取消掉
						board[i][j]=0;
						//加分
						score += board[k][j];
						//把加分通知前台
						updateScore(score);
						//设定这个位置发生了碰撞
						hasConflicted[k][j] = true;
						break;
					}
				}
			}
		}
	}
	//刷新页面,对显示上的设定通知前端
	setTimeout("updateBoardView()",200);
	return true;
}
