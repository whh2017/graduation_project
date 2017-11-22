
/* 加载Plus排行数据 */
$.ajax({  
	type: "get",  
			// 老麦提供接口
			url: "data/index_rank.json",  
			dataType: "json",
			success: function (res) {  
				var i = 0;
				for( i = 0; i < 10; i++){
					$('.left-navgation ul').append('<li class="clearfix"><em class="fl">'+res.item[i].number+'</em><a href="#" class="fl">'+res.item[i].title+'</a></li>');
					$('.left-navgation li a').attr("href",res.item[i].a_href);
				}
				console.log("Rank列表加载完毕....");
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){  
				console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
				console.log("错误类型textStatus: " + textStatus);  
				console.log("异常对象errorThrown: " + errorThrown);  
			}  
		});

/* 轮播  */ 
		var timer = setInterval("roundslide()",4000); //指定4秒刷新一次
		var index = 0;

		function auto(){
			$('.banner li').eq(index).addClass("cur").stop().animate({opacity:'1'},500);
			$('.banner li').eq(index).siblings().removeClass("cur").stop().animate({opacity:'0'},500);
			$('.slide li').eq(index).addClass("cur").siblings().removeClass("cur");
		}
		function roundslide(){		
			index++;
			if(index == $('.banner li').length){
				index = 0;
			}	
			auto();	
		}

		$('.banner li').mouseover(function(){
			clearInterval(timer);
		});

		$('.slide li').hover(function(){
			index = $(this).index();
			auto();
			clearInterval(timer);
		});

		$('.banner li').mouseout(function(){
			timer = setInterval("roundslide()",4000); 
		});

		$(".side-navigation li.top a").click(function(){
			$("html,body").animate({scrollTop: 0}, 1000);
		});

		/* 滚动到一定高度显示回到顶部按钮 */
		$(window).scroll(function(){  
			if($(window).scrollTop()>450){  
				$('.side-navigation .top').fadeIn(600);  
			}  
			else{$('.side-navigation .top').fadeOut(600);}  

		});

        /*
		if(!window.localStorage){
            alert("浏览器支持localstorage");
        }else{
            var storage=window.localStorage;
            var data={
                name:'xiecanyong',
                sex:'man',
                hobby:'program'
            };
            var d=JSON.stringify(data);
            storage.setItem("data",d);
            alert(storage.data);
            var json=storage.getItem("data");
            var jsonObj=JSON.parse(json);
            alert(jsonObj.name);
        }
        */  


/* 悬停出现文字框提示效果 */
	$('.right-navigation li a').hover(function(){
		$(this).find('.txt').addClass("hide");
		// $('.txt-mask').removeClass("hide");
		$(this).find('.txt-mask').stop().animate({ height:"100%"},200);
	},function(){
		// $('.txt-mask').addClass("hide");
		$(this).find('.txt-mask').stop().animate({ height:"0"},200);
		$(this).find('.txt').removeClass("hide");
	});