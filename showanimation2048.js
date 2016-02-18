//随机产生小格子的动画效果
function showNumberWithAnimation(i,j,randNumber){
	//找到要动画显示的小格子
	var numberCell = $("#number-cell-"+i+"-"+j);
	//设置小格子的css样式
	numberCell.css("background-color",getNumberBackgroundColor(randNumber));
	numberCell.css("color",getNumberColor(randNumber));
	numberCell.text(randNumber);
	//实现动画,前面是要达成什么效果，后面参数是50毫秒
	numberCell.animate({width:cellSideLength+'px',height:cellSideLength+'px',top:getPosTop(i,j),left:getPosLeft(i,j)},50)
}

//移动小方格的动画效果
function showMoveAnimation( fromx , fromy , tox , toy ){
	////找到要动画显示的小格子
	var numberCell = $("#number-cell-"+fromx+"-"+fromy);
	//实现动画,前面是要达成什么效果，后面参数是200毫秒
	numberCell.animate({top:getPosTop(tox,toy),left:getPosLeft(tox,toy)},200);
}

function updateScore( score ){
	$('#score').text( score );
}



