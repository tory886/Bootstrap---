//1.动画效果
//2.随机位置
//3.游戏逻辑
$(function () {
    // 1.监听游戏规则的点击
    $(".rules").click(function () {
		// 监听rule,淡入		
        $(".rule").stop().fadeIn(100);
    });

    // 2.监听关闭按钮的点击
    $(".close").click(function () {
		//监听rule,淡出
        $(".rule").stop().fadeOut(100);
    });

    // 3.监听开始游戏按钮的点击
    $(".start").click(function () {
		//start按钮淡出
        $(this).stop().fadeOut(100);
        // 调用处理进度条的方法
        progressHandler();
        // 调用处理灰太狼动画的方法
        startWolfAnimation();
    });

    // 4.监听重新开始按钮的点击
    $(".reStart").click(function () {
		//game over淡出
        $(".mask").stop().fadeOut(100);
        // 调用处理进度条的方法
        progressHandler();
        // 调用处理灰太狼动画的方法
        startWolfAnimation();
    });

    // 定义一个专门处理进度条的方法
    function progressHandler() {
        // 重新设置进度条的宽度
        $(".progress").css({
            width: 180
        });
        // 开启定时器处理进度条
        var timer = setInterval(function () {
            // 拿到进度条当前的宽度
            var progressWidth = $(".progress").width();
            // 减少当前的宽度
            progressWidth -= 1;
            // 重新给进度条赋值宽度
            $(".progress").css({
                width: progressWidth
            });
            // 监听进度条是否走完
            if(progressWidth <= 0){
                // 关闭定时器
                clearInterval(timer);
                // 显示重新开始界面
                $(".mask").stop().fadeIn(100);
                // 停止灰太狼的动画
                stopWolfAnimation();
            }
        }, 300);
    }

    var wolfTimer;
    // 定义一个专门处理灰太狼动画的方法
    function startWolfAnimation() {
        // 1.定义两个数组保存所有灰太狼和小灰灰的图片
		//灰太狼
        var wolf_1=['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png','./img/h4.png','./img/h5.png','./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png'];
        //小灰灰
		var wolf_2=['./img/x0.png','./img/x1.png','./img/x2.png','./img/x3.png','./img/x4.png','./img/x5.png','./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];

        // 3.创建一个图片
        var $wolfImage = $("<img src='' class='wolfImage'>");
        // 随机获取图片的位置
		// 随机0-8之间的数
        var posIndex = Math.round(Math.random() * 8);
        // 4.设置图片显示的位置
        $wolfImage.css({
           position: "absolute",
		    //随机取到的数确定其出现的位置
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
        // 随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        // 5.设置图片的内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function () {
            if(wolfIndex > wolfIndexEnd){
                $wolfImage.remove();
				// 关闭定时器
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
			// 改变图片的类型 小灰灰or灰太狼
			// arrt()返回wolfImage的属性值
            $wolfImage.attr("src", wolfType[wolfIndex]);
			//让动画更为流畅
            wolfIndex++;
        }, 600); 

        // 6.将图片添加到界面上
        $(".container").append($wolfImage);

        // 7.调用处理游戏规则的方法
        gameRules($wolfImage);
    }
	//定义一个游戏规则的方法
    function gameRules($wolfImage) {
		//one()运行一次
        $wolfImage.one("click",function () {
            // 修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;

            // 拿到当前点击图片的地址
            var $src = $(this).attr("src");
            // 根据图片地址判断是否是灰太狼
            var flag = $src.indexOf("h") >= 0;
            // 根据点击的图片类型增减分数
            if(flag){
                // +10
                $(".score").text(parseInt($(".score").text()) + 10);
            }else{
                // -10
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }
	//停止游戏动画方法
    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }
});