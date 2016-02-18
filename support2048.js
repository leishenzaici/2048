//计算并返回ij块距离顶端的距离
function getPosTop( i , j ){
	return 20+i*120;
}
//计算并返回ij块距离左端的距离
function getPosLeft( i , j ){
	return 20+j*120;
}
//计算小块的背景色
function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67e5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	return "black";
}

function getNumberColor( number ){
	if(number<=4){
		return "776e65";
	}
	return "white";
}
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

function canMoveLeft(board){
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 1 ; j < 4 ; j ++ ){
			if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
				return true;
			}
		}
	}
	return false;
}

function noBlockHorizontal( row , col1 , col2 , board ){
	
	for( var i = col1 + 1 ; i < col2 ; i ++){
		if( board[row][i] != 0 ){
			return false;
		}
	}
	return true;
}

function canMoveUp(board){
	//遍历一个3*4的格子
	for( var i = 1 ; i < 4 ; i ++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
				return true;
			}
		}
	}
	return false;
}

function noBlockVertical( col , row1 , row2 , board ){
	for( var i = row1 + 1 ; i < row2 ; i ++){
		if( board[i][col] != 0 ){
			return false;
		}
	}
	return true;
}

function canMoveRight(board){
	for( var i = 0 ; i < 4 ; i ++ ){
		for( var j = 0 ; j < 3 ; j ++ ){
			if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
				return true;
			}
		}
	}
	return false;
}

function canMoveDown(board){
	for( var i = 0 ; i < 3 ; i ++ ){
		for( var j = 0 ; j < 4 ; j ++ ){
			if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
				return true;
			}
		}
	}
	return false;
}

//判断是否能移动
function nomove(){
	if(canMoveLeft(board)||canMoveUp(board)||canMoveRight(board)||canMoveDown(board)){
		return false;
	}
	return true;
}



