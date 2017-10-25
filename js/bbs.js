$(document).ready(function(){

	/* 悬停出现文字框提示效果 */
	$('.advertment-lump .banner a').hover(function(){
		$(this).find('.txt').addClass("hide");
		// $('.txt-mask').removeClass("hide");
		$(this).find('.txt-mask').stop().animate({ height:"100%"},200);
	},function(){
		// $('.txt-mask').addClass("hide");
		$(this).find('.txt-mask').stop().animate({ height:"0"},200);
		$(this).find('.txt').removeClass("hide");
	});

	$('.sort-lump').click(function(){
		$('.sort-item').toggleClass("hide");
	});
	popup1($('.editor-lump'));

	$('.left-content .edit').click(function(){
		MaskIt1($('.mask'));
		$('.editor-lump').removeClass("hide")
		// $('.editor-lump').fadeIn();
			var _scrollHeight = $(document).scrollTop(),//获取当前窗口距离页面顶部高度 
			_windowHeight = $(window).height(),//获取当前窗口高度 	
			_popupHeight = $('.editor-lump').height(),//获取弹出层高度 
			_posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight; 
			$('.editor-lump').animate({top: _posiTop + "px"},700);
		});

	$('.edit-content .stop').click(function(){
		UnMaskIt1($('.mask'));
		// $('.editor-lump').fadeOut();
		$('.editor-lump').addClass("hide")
		$('.editor-lump').animate({top: "-522px"},200);
	});
});
/* 广告轮播效果 */
var timer = setInterval("roundslide()",4000); //指定4秒刷新一次
var index = 0;

function auto(){
	$('.advertment-lump .banner li').eq(index).addClass("cur").stop().animate({opacity:'1'},500);
	$('.advertment-lump .banner li').eq(index).siblings().removeClass("cur").stop().animate({opacity:'0'},500);
	$('.advertment-lump .slide li').eq(index).addClass("cur").siblings().removeClass("cur");
}
function roundslide(){		
	index++;
	if(index == $('.advertment-lump .banner li').length){
		index = 0;
	}	
	auto();	
}			

$('.advertment-lump .banner li').mouseover(function(){
	clearInterval(timer);
});

$('.advertment-lump .slide li').hover(function(){
	index = $(this).index();
	auto();
	clearInterval(timer);
});

$('.advertment-lump .banner li').mouseout(function(){
	timer = setInterval("roundslide()",4000); 
});
