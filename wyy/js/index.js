	
	// 获取audio1原生对象
	var audio1 = document.getElementById('audio1');
	// 获取滑块对象
	var curBtn = document.getElementById('cur-btn');
	//获取红色进度条
	var processCur = document.getElementById('process-cur');

	var timeInterval;
	var timeInterval2;

	var json1 = null;

	$.ajax({
		timeout:5000,
		async: false,
		url: 'js/main.json',
		type: 'GET',
		dataType: 'json',
	})
	.done(function(data,status,xhr) {

		json1 = data;
		
		var resurt = null;
		resurt = localStorage.getItem('index');
		
		$.each(json1,function(index, el){
			//localStrage本地储存
			if(resurt != null){
				$('#singList').append('<li index="' + el.index + '">' + el.song + '<span>&nbsp;&nbsp;-' + el.singer + '</span></li>');
				if(el.index == resurt){
					$('#singList li[index=' + resurt + ']').addClass('active');
					getSong(el.src);
					$('.song').text(el.song);
					$('.artist').text(el.singer);
				}
				
			}else if(index == 0){
				$('#singList').append('<li class="active" index="' + el.index + '">' + el.song + '<span>&nbsp;&nbsp;-' + el.singer + '</span></li>')
				getSong(el.src);
				$('.song').text(el.song);
				$('.artist').text(el.singer);
			}else{
				$('#singList').append('<li index="' + el.index + '">' + el.song + '<span>&nbsp;&nbsp;-' + el.singer + '</span></li>');
			}

		});

	})
	.fail(function(xhr,errorStatus,errorText) {
		console.log("error");
		if(errorStatus == 'timeout'){
			alert('请求超时！请重新尝试');
		}
	});
	
	

	//获取歌曲链接并插入dom中
	function getSong(msrc) {

		audio1.src ='music/' + msrc;

	}
	// 开始按钮
	$('.play').click(function(event) {
	
		// CD顶针开始
		$('.play-needle').addClass('stop');
		$('.disk').addClass('stop')
		$('.play').css('display','none');
		$('.pause').css('display','inline-block');
		//开始播放
		audio1.play();
		//当前播放时间
		timeInterval = setInterval(function(){
			$('#current-time').text(getTime(audio1.currentTime)); 
			songLyric();
		},1000);

		
	});
		

	// 暂停按钮
	$('.pause').click(function(event) {
		// CD顶针关闭
		$('.play-needle').removeClass('stop');
		$('.disk').removeClass('stop')
		$('.play').css('display','inline-block');
		$('.pause').css('display','none');
		// 暂停播放
		audio1.pause();
		//当前播放时间
		$('#current-time').text(getTime(audio1.currentTime));
		clearInterval(timeInterval);
		//暂停进度条
		clearInterval(timeInterval2);

	});

	var aa = null;
	// 下一曲按钮
	$('.next').click(function(event) {
		if (i == 3) {
			m4();
			return;
		}
		if ($('#singList li').last('li').attr('index') == $('.active').attr('index') ) {
			getSong( $('#singList li').first('li').attr('index') + '.mp3' );
			$('.active').removeClass('active');
			$('#singList li').first('li').addClass('active');
		} else {
			getSong( $('.active').next('li').attr('index') + '.mp3' );
			aa = $('.active');
			$('.active').removeClass('active');
			aa.next('li').addClass('active');
		}

		$('.pause').click();
		$('.play').click();	
		flag = true;
		
	});

	// 上一曲按钮
	$('.pre').click(function(event) {

		if($('.active').attr('index') == $('#singList li').first('li').attr('index') ){
			getSong( $('#singList li').last('li').attr('index') + '.mp3' );
			$('.active').removeClass('active');
			$('#singList li').last('li').addClass('active');
		} else {
			getSong( $('.active').prev('li').attr('index') + '.mp3' );	
			aa = $('.active');
			$('.active').removeClass('active');
			aa.prev('li').addClass('active');
		}
		
		$('.pause').click();
		$('.play').click();	
		flag = true;
		
	});

	var flag = false;
	//歌曲改变事件
	audio1.addEventListener('durationchange',function() {

		// 歌曲总时间
		$('#total-time').text(getTime(audio1.duration));
		if(flag){
			songActive();
		}
		
		$.each(json1,function(index,el){

			if($('.active').attr('index') == el.index){
				$('.song').text(el.song);
				$('.artist').text(el.singer);
				$('.disk-albun-bg').css('background-image', 'url(' + el.img + ')');
				$('.disk-albun-bg').css('background-size', 'cover');
				$('.bg').css('background-image', 'url(' + el.img + ')');
				$('.bg').css('background-size', 'cover');

				localStorage.setItem('index',el.index);
				
				lyric(el.index);

				return;
			}

		});



	},false);
	// 歌曲开始播放事件
	audio1.addEventListener('play',function() {
		
		songActive();

		
	},false);
	//歌曲停止播放事件
	audio1.addEventListener('pause',function() {

		// 歌曲总时间
		$('#total-time').text(getTime(audio1.duration));
	},false);


	// 计算播放时间
	function getTime(time) {

		var minute = parseInt(time/60);
		if (minute < 10) {
			minute = '0' + minute;
		}

		var second = parseInt(time%60);
		if (second < 10) {
			second = '0' + second;
		}

		return minute + ':' + second;
	}
	// 滑块运动函数
	function songActive() {

		var speed = parseFloat(240/audio1.duration);
		var plan = parseInt(speed*audio1.currentTime);
		var speed2 = parseFloat(2.4/audio1.duration);
		var plan2 = parseFloat(speed2*audio1.currentTime);
		console.log(audio1.currentTime);
		//获得请求报头的浏览器信息
		var userAgent = navigator.userAgent;
		
		//根据浏览器信息跳转到PC站或者mobile站
		if ( userAgent.toLowerCase().indexOf('android') != -1 
			|| userAgent.toLowerCase().indexOf('iphone') != -1
			|| userAgent.toLowerCase().indexOf('ipad') != -1) {
			timeInterval2 = setInterval(m2,1000);
			touchMobile();			
		} else {
			timeInterval2 = setInterval(m1,1000);
			touchPc();	
		}

		//pc端运动
		function m1(){

			if (plan <= 240) {

				$('#cur-btn').css('left',plan + 'px');
				$('#process-cur').css('width', plan);
				plan += speed;
				
			}


		}
		//移动端运动
		function m2(){

			if (plan2 <= 2.4) {
				
				$('#cur-btn').css('left',plan2 + 'rem');
				$('#process-cur').css('width', plan2 + 'rem');
				plan2 += speed2;
				
			}

		}
	
	}
	// 列表点击出现事件
	$('.list').click(function(event) {
		$('#play-list').animate({bottom:0}, 1000);
	});

	//列表隐藏事件
	$('.list-title-close,.center,header,#play-list li').click(function(event) {
		$('#play-list').animate({bottom:-360}, 1000);
	});
	
	//列表切歌事件
	$('#play-list').on('click', 'li', function(event) {
		getSong($(this).attr('index') + '.mp3' );
		$('.active').removeClass('active');
		$(this).addClass('active');
		$('.pause').click();
		$('.play').click();	
		flag = true;
	});
	var i = 1;//标记
	// 播放次序切换
	$('.loop').click(function(event) {
		
		if(i % 3 == 1){
			$('.loop').css('background-image', 'url(images/play_icn_loop_solo.png)');
			$('.loop').css('background-size', 'cover');
		}else if(i % 3 == 2 ){
			$('.loop').css('background-image', 'url(images/play_icn_loop_random.png)');
			$('.loop').css('background-size', 'cover');
		}else if(i % 3 == 0 ){
			$('.loop').css('background-image', 'url(images/play_icn_loop.png)');
			$('.loop').css('background-size', 'cover');
		}
		i ++;
		
	});

	// 歌曲结束监听
	audio1.addEventListener('ended',m4,false);
	function m4(){

		if(i % 3 == 1){
			$('.next').click();
		}else if(i % 3 == 2 ){
			getSong($('.active').attr('index')+ '.mp3' );
			flag = true;
			$('.pause').click();
			$('.play').click();
		}else if(i % 3 == 0 ){


			var nub = Math.floor((7-1+1) * Math.random() + 1) ;
		
				getSong( nub + '.mp3' );
				aa = $('.active');
				flag = true;
				$('.active').removeClass('active');
				$('#play-list li[index=' + nub + ']').addClass('active');
				$('.pause').click();
				$('.play').click();

		}
	}
	// 滑块拖动事件
	var startX,x,aboveX = 0;//触摸时的坐标//滑动的距离//设一个全局变量记录上一次内部块滑动的位置

	//mobile滑块拖动
	function touchMobile() {
		//手指按下
		curBtn.addEventListener('touchstart',function(e){

			e.preventDefault();//清除默认行为

			var touch = e.touches[0];

			startX = touch.pageX;

			clearInterval(timeInterval2);

			aboveX = parseFloat(curBtn.style.left);
			
		},false);

		//手指离开屏幕
		curBtn.addEventListener('touchend',function(e){

			e.preventDefault();//清除默认行为

			aboveX = parseFloat(curBtn.style.left);

			var touch = e.touches[0];
			
			var currentTime = (parseFloat(curBtn.style.left) / 2.4) * audio1.duration;
			audio1.currentTime = currentTime;

			clearInterval(timeInterval2);

			songActive();

			if((curBtn.style.left) > 2.4){

				return;
			}
			if((aboveX + x) < 0){
				curBtn.style.left = 0 + 'rem';
				processCur.style.width = 0 + 'rem';
				return;

			}


		},false);

		//手指移动
		curBtn.addEventListener('touchmove',function(e){

			e.preventDefault();//清除默认行为

			var touch = e.touches[0];

			x = (touch.pageX - startX)/100;//滑动的距离

			curBtn.style.left = (aboveX + x) + 'rem';

			processCur.style.width = (aboveX + x) + 'rem';

			if((aboveX + x) > 2.4){
				curBtn.style.left = 2.4 + 'rem';
				processCur.style.width = 2.4 + 'rem';
				return;
			}
			if((aboveX + x) < 0){
				curBtn.style.left = 0 + 'rem';
				processCur.style.width = 0 + 'rem';
				return;

			}

			

		},false);
	}
	// pc滑块拖动
	function touchPc() {

		curBtn.onclick=function (e) {
		
			e.stopPropagation();
		};
		
		//鼠标按下
		curBtn.onmousedown = function(e){
			
			e.preventDefault();//清除默认行为

			startX = e.clientX;

			clearInterval(timeInterval2);

			aboveX = parseFloat(curBtn.style.left);

			//鼠标移动
			document.addEventListener('mousemove',m3,false);

			function m3(e){

				e.preventDefault();//清除默认行为

				x = (e.clientX - startX);//滑动的距离

				curBtn.style.left = (aboveX + x) + 'px';

				processCur.style.width = (aboveX + x) + 'px';

				if(parseInt(curBtn.style.left) > 240){
					curBtn.style.left = 240 + 'px';
					processCur.style.width = 240 + 'px';
					return;
				}

				if(parseInt(curBtn.style.left) < 0){
					curBtn.style.left = 0 + 'px';
					processCur.style.width = 0 + 'px';
					return;

				}

			}

			//鼠标离开屏幕
			document.onmouseup = function(e){

				document.removeEventListener('mousemove',m3,false);

				e.preventDefault();//清除默认行为

				aboveX = parseInt(curBtn.style.left);
				
				var currentTime = (parseInt(curBtn.style.left) / 240) * audio1.duration;

				audio1.currentTime = currentTime;

				songActive();

				if(parseInt(curBtn.style.left) > 240){
					curBtn.style.left = 240 + 'px';
					processCur.style.width = 240 + 'px';
					return;
				}
				
				if(parseInt(curBtn.style.left) < 0){
					curBtn.style.left = 0 + 'px';
					processCur.style.width = 0 + 'px';
					return;

				}

				document.onmouseup = null;
			}
	
		}

	}

	$('.center').click(function(event) {
		$('.center').css('display', 'none');
		$('.lyric').css('display','block' );
	});

	$('.lyric').click(function(event) {
		$('.lyric').css('display', 'none');
		$('.center').css('display','block' );
	});
	var timeLyric = [];
	// 歌词开始
	function lyric(index) {
		$('.lyric ul').css('top', '147px');
		$('.lyric ul').empty();

		$.ajax({
			url: 'js/lyric.json',
			type: 'GET',
			dataType: 'json',
			async:false
		})
		.done(function(data,status,xhr) {
			timeLyric = [];
			var index1 = index;
			$.each(data,function(index, el) {
				if (el.index == index1) {

					var r = /\d{2}:\d{2}.\d{2}?/g;
					var r1 = /(\])(.*?)(\[)/g;
					var rArray =el.lyric.match(r); 
					var r1Array = el.lyric.match(r1,'$2');
					for(var i = 0;i < rArray.length; i++){
						for (var j = 0; j < r1Array.length; j++) {

							if(i == j){
								r1Array[j] = r1Array[j].replace(/^\]+/g,'').replace(/\[+$/,'');
								var stringLyric = '<li index-lyric="' + j + '">' + r1Array[j] + '</li><br>';
								$('.lyric ul').append(stringLyric);
								var set = [rArray[i],r1Array[j]];
								timeLyric.push(set);
							}
						}
					}

				};
			});
			
		})
		.fail(function(xhr,errorStatus,errorText) {
			alert('error');
		})
		
		
	}	
	
	
	function songLyric() {
		var set = 0;
		var set1 = 0;
		for (var i = 0; i < timeLyric.length; i++) {
			if(parseInt(timeLyric[i][0].charAt(1)) == 0){
				set = parseFloat(timeLyric[i][0].substring(3,7));
				
			}else{
				set = parseFloat(timeLyric[i][0].substring(3,7)) + parseInt(timeLyric[i][0].charAt(1))*60;
			}
			if (i+1 < timeLyric.length){
				if(parseInt(timeLyric[i+1][0].charAt(1)) == 0){
					set1 = parseFloat(timeLyric[i+1][0].substring(3,7));
				
				}else{
					set1 = parseFloat(timeLyric[i+1][0].substring(3,7)) + parseInt(timeLyric[i][0].charAt(1))*60;
				}
			}else{
				set1 = 10000;
			}
			
			if(set < audio1.currentTime && set1 > audio1.currentTime){
				
				$('.lyric ul li[index-lyric='+i+']').addClass('active1');

				var asd = $('.lyric ul li[index-lyric='+i+']').get(0).getBoundingClientRect().top;
				asd = asd - 226
				$('.lyric ul').animate({top:'-=' + asd}, 0);
					
			}else {
				$('.lyric ul li[index-lyric='+i+']').removeClass('active1');
			
			}
		}
	}
