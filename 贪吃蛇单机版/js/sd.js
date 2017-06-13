$(function(){
	//初始化变量
	var snakeTop = 100;//小蛇距离容器顶端的距离
	var snakeLeft = 100;//小蛇距离容器左端的距离
	var snakeTop2 = 200;//小蛇距离容器顶端的距离
	var snakeLeft2 = 200;//小蛇距离容器左端的距离
	var snakePosition = 10;//小蛇每次移动的距离
	var speed = 100;//速度
	var timerId;//定时器
	var flag = null;//方向键标志
	var flag7 = 0;
	var x = 300;
	var y = 300;
	
	//初始化小蛇位置
	$('<div class="snake" id="snakeHeader">').appendTo("#wrap").css({top:snakeTop + "px",left:snakeLeft + "px"});
	$('<div class="snake2" id="snakeHeader2">').appendTo("#wrap").css({top:snakeTop2 + "px",left:snakeLeft2 + "px"});
	//初始化水果位置
	$('<div class="fruit">').prependTo("#wrap").css({top:x + "px",left:y + "px"});
	//创建水果
	function creatFruit(){
		var flag2 = true;
		x = Math.floor((49 + 1) * Math.random());
		y = Math.floor((49 + 1) * Math.random());
		x *= 10;
		y *= 10;
		var snake = $(".snake");
		for(var i = 0;i < snake.length;i ++){
			if(parseInt(snake.eq(i).css("top")) == y && parseInt(snake.eq(i).css("left")) == x){
				// alert("xuigai");
				console.log(x + "," + y);
				creatFruit();
				flag2 = false;
			}
		}
		var snake2 = $(".snake2");
		for(var i = 0;i < snake2.length;i ++){
			if(parseInt(snake2.eq(i).css("top")) == y && parseInt(snake2.eq(i).css("left")) == x){
				// alert("xuigai");
				console.log(x + "," + y);
				creatFruit();
				flag2 = false;
			}
		}
		if(flag2){
			$('<div class="fruit">').prependTo("#wrap").css({top:y + "px",left:x + "px"});
		}		
	}
	//方向控制
	$(document).keydown(function(e){
		if(e.keyCode == 38 && flag != 2){
			flag = 1;
			// snakeMove();
		}
		if(e.keyCode == 40 && flag != 1){
			flag = 2;
			// snakeMove();
		}
		if(e.keyCode == 37 && flag != 4){
			flag = 3;
			// snakeMove();
		}
		if(e.keyCode == 39 && flag != 3){
			flag = 4;
			
			// snakeMove();
		}
		if(e.keyCode == 32){
			flag = null;
		}
		// alert(e.keyCode);
	});
	//转换头元素
	function changeHeaer(){
		// $("#snakeHeader").attr("class","snake");
		if(flag7==1){
			$("#snakeHeader").attr("id","");
			$(".fruit").attr("id","snakeHeader");
			$(".fruit").attr("class","snake");
		}
		if (flag7==2) {
			$("#snakeHeader2").attr("id","");
			$(".fruit").attr("id","snakeHeader2");
			$(".fruit").attr("class","snake2");
		}
		
	
	}
	// var lastBodyTop = [];
	// var lastBodyLeft = [];
	function snakeBodyPosition(){
		var lastBodyTop = [];
		var lastBodyLeft = [];
		var lastBodyTop2 = [];
		var lastBodyLeft2 = [];
		var snake = $(".snake");
		for(var i = 0;i < snake.length;i ++){
			lastBodyTop[i] = snake.eq(i).css("top");
			lastBodyLeft[i] = snake.eq(i).css("left");
		}
		var snake2 = $(".snake2");
		for(var i = 0;i < snake2.length;i ++){
			lastBodyTop2[i] = snake2.eq(i).css("top");
			lastBodyLeft2[i] = snake2.eq(i).css("left");
		}
		setTimeout(function(){
			for(var i = 0;i < snake.length;i ++){
				if(snake.eq(i + 1))
					snake.eq(i + 1).css({top:lastBodyTop[i],left:lastBodyLeft[i]});
			}
			for(var i = 0;i < snake2.length;i ++){
				if(snake2.eq(i + 1))
					snake2.eq(i + 1).css({top:lastBodyTop2[i],left:lastBodyLeft2[i]});
			}
		},100);

	}
	// 判断是否撞死
	function dieJudge(){
		var snake = $(".snake");
		for(var i = 3;i < snake.length;i ++){
			if(parseInt(snake.eq(i).css("top")) == snakeTop && parseInt(snake.eq(i).css("left")) == snakeLeft){
				alert("你太贪吃啦，把自己吃掉啦！");
				// clearTimeout(timerId);
				chuShiHua();
			}
		}
		var snake2 = $(".snake2");
		for(var i = 3;i < snake2.length;i ++){
			if(parseInt(snake2.eq(i).css("top")) == snakeTop2 && parseInt(snake.eq(i).css("left")) == snakeLeft2){
				alert("你太贪吃啦，把自己吃掉啦！");
				// clearTimeout(timerId);
				chuShiHua();
			}
		}
	}
	function chuShiHua(){
		// alert("从哪跌倒从哪爬起来，再来！！");
		flag = null;
		$("#wrap").empty();
		creatFruit();
		snakeTop = 20;
		snakeLeft = 20;
		snakeTop2 = 20;
		snakeLeft2 = 20;
		$('<div class="snake" id="snakeHeader">').appendTo("#wrap").css({top:snakeTop + "px",left:snakeLeft + "px"});
		$('<div class="snake2" id="snakeHeader2">').appendTo("#wrap").css({top:snakeTop2 + "px",left:snakeLeft2 + "px"});
	}
	//小蛇移动
	function snakeMove(){
		if(flag == 1){
			if(snakeTop == 0){
				alert("头撞没啦");
				chuShiHua();
				// return;
			}
			if(snakeTop2 == 0){
				alert("头撞没啦");
				chuShiHua();
				// return;
			}			
			snakeTop -= snakePosition;
			snakeTop2 -= snakePosition;
			$("#snakeHeader").css({top:snakeTop + "px",left:snakeLeft + "px"});
			$("#snakeHeader2").css({top:snakeTop2 + "px",left:snakeLeft2 + "px"});
		}
		if(flag == 2){
			if(snakeTop == 480){
				alert("头撞没啦");
				chuShiHua();
				// return;
			}			
			if(snakeTop2 == 480){
				alert("头撞没啦");
				chuShiHua();
				// return;
			}	
			snakeTop += snakePosition;
			snakeTop2 += snakePosition;
			$("#snakeHeader").css({top:snakeTop + "px",left:snakeLeft + "px"});
			$("#snakeHeader2").css({top:snakeTop2 + "px",left:snakeLeft2 + "px"});
		}
		if(flag == 3){
			if(snakeLeft == 0){
				alert("头撞没啦");
				chuShiHua();
				// return;
			}	
			if(snakeLeft2 == 0){
				alert("头撞没啦");
				chuShiHua();
				// return;
			}		
			snakeLeft -= snakePosition;
			snakeLeft2 -= snakePosition;
			$("#snakeHeader").css({top:snakeTop + "px",left:snakeLeft + "px"});
			$("#snakeHeader2").css({top:snakeTop2 + "px",left:snakeLeft2 + "px"});
			
		}
		if(flag == 4){
			if(snakeLeft == 480){
				alert("头撞没啦");
				chuShiHua();
				// return;
			}	
			if(snakeLeft2 == 480){
				alert("头撞没啦");
				chuShiHua();
				// return;
			}		
			snakeLeft += snakePosition;
			snakeLeft2 += snakePosition;
			$("#snakeHeader").css({top:snakeTop + "px",left:snakeLeft + "px"});
			$("#snakeHeader2").css({top:snakeTop2 + "px",left:snakeLeft2 + "px"});
			
		}
		if(flag){
			
			if(x == snakeLeft && y == snakeTop){
				flag7 = 1;
				changeHeaer();
				creatFruit();
			}
			if(x == snakeLeft2 && y == snakeTop2){
				flag7 = 2;
				changeHeaer();
				creatFruit();
			}
				

			snakeBodyPosition();
			
			
			
		}
		timerId = setTimeout(snakeMove,100);
		dieJudge();
	}
	// 启动游戏
	$("#startGame").click(function(){
		clearTimeout(timerId);
		flag = null;
		
	});	
	snakeMove();
	
});

