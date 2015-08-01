//获取屏幕的宽度
documentWidth = window.screen.availWidth;
//整个大方框的宽度
gridContainerWidth = 0.92 * documentWidth;
//小方块的边长
cellSideLength = 0.18 * documentWidth;
//小方块之间的间距
cellSpace = 0.04 * documentWidth;

//计算并返回ij块距离顶端的距离
function getPosTop( i , j ){
	return cellSpace + i*(cellSpace+cellSideLength);
}
//计算并返回ij块距离左端的距离
function getPosLeft( i , j ){
	return cellSpace + j*(cellSpace+cellSideLength);
}
//计算小块的背景色
function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;//士兵
		case 4:return "#ede0c8";break;//准尉
		case 8:return "#f2b179";break;//少尉
		case 16:return "#f59563";break;//中尉
		case 32:return "#f67e5f";break;//上尉
		case 64:return "#f65e3b";break;//少校
		case 128:return "#edcf72";break;//中校
		case 256:return "#edcc61";break;//上校
		case 512:return "#9c0";break;//大校
		case 1024:return "#33b5e5";break;//少将
		case 2048:return "#09c";break;//中将
		case 4096:return "#a6c";break;//上将
		case 8192:return "#93c";break;//元帅
	}
	return "black";
}
//计算小块的前景色，即字的颜色
function getNumberColor( number ){
	if(number<=4){
		return "776e65";
	}
	return "white";
}
//检查是否有空格
function nospace(){
	for( var i = 0 ; i < 4 ; i++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			if(board[i][j] == 0 ){
				return false;
			}
		}
	}
	return true;
}
//定义检查是否能向左移动的函数
function canMoveLeft(board){
	//遍历一个4*3的格子
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 1 ; j < 4 ; j ++ ){
			if(board[i][j]!=0){
				//如果当前小格子左边有空格或者左边的小格子的数和当前小格子的数一样，就表示能向左移动，返回true
				if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//定义判断横着的两个块之间有无障碍的函数
function noBlockHorizontal( row , col1 , col2 , board ){
	//遍历两个块之间的块
	for( var i = col1 + 1 ; i < col2 ; i ++){
		//如果有一个小方格不是0，就证明有障碍
		if( board[row][i] != 0 ){
			return false;
		}
	}
	return true;
}

//定义检查是否能向上移动的函数
function canMoveUp(board){
	//遍历一个3*4的格子
	for( var i = 1 ; i < 4 ; i ++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			if(board[i][j]!=0){
				//如果当前小格子上边有空格或者上边的小格子的数和当前小格子的数一样，就表示能向上移动，返回true
				if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//定义判断竖着的两个块之间有无障碍的函数
function noBlockVertical( col , row1 , row2 , board ){
	//遍历两个块之间的块
	for( var i = row1 + 1 ; i < row2 ; i ++){
		//如果有一个小方格不是0，就证明有障碍
		if( board[i][col] != 0 ){
			return false;
		}
	}
	return true;
}

//定义检查是否能向右移动的函数
function canMoveRight(board){
	//遍历一个3*4的格子
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 0 ; j < 3 ; j ++ ){
			if(board[i][j]!=0){
				//如果当前小格子上边有空格或者上边的小格子的数和当前小格子的数一样，就表示能向上移动，返回true
				if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//定义检查是否能向下移动的函数
function canMoveDown(board){
	//遍历一个3*4的格子
	for( var i = 0 ; i < 3 ; i ++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			if(board[i][j]!=0){
				//如果当前小格子上边有空格或者上边的小格子的数和当前小格子的数一样，就表示能向上移动，返回true
				if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断整体是否能移动
function nomove(){
	//如果上下左右只要有一个能移动，则返回false
	if(canMoveLeft(board)||canMoveUp(board)||canMoveRight(board)||canMoveDown(board)){
		return false;
	}
	return true;
}



