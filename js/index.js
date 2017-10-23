

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


