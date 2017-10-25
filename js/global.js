

function MaskIt(obj){
			var hoverdiv = '<div class="divMask" style="position: fixed; width: 100%; height: 100%; left: 0; top: 0; background-color: #000; opacity: .7 ;z-index:20; filter:Alpha(Opacity=70);"></div>';

			$(obj).before(hoverdiv);
			$(obj).data("mask",true);
		}
		function UnMaskIt(obj){
			if($(obj).data("mask")==true){
				$(obj).parent().find(".divMask").remove();

				$(obj).data("mask",false);
			}
			$(obj).data("mask",false);
		}
function MaskIt1(obj){
			var hoverdiv = '<div class="divMask" style="position: fixed; width: 100%; height: 100%; left: 0; top: 0; background-color: #000; opacity: .3 ;z-index:20; filter:Alpha(Opacity=30);"></div>';

			$(obj).before(hoverdiv);
			$(obj).data("mask",true);
		}
		function UnMaskIt1(obj){
			if($(obj).data("mask")==true){
				$(obj).parent().find(".divMask").remove();

				$(obj).data("mask",false);
			}
			$(obj).data("mask",false);
		}
		function popup(popupName){ 
			var _scrollHeight = $(document).scrollTop(),//获取当前窗口距离页面顶部高度 
			_windowHeight = $(window).height(),//获取当前窗口高度 
			_windowWidth = $(window).width(),//获取当前窗口宽度 
			_popupHeight = popupName.height(),//获取弹出层高度 
			_popupWeight = popupName.width();//获取弹出层宽度 
			_posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight; 
			_posiLeft = (_windowWidth - _popupWeight)/2; 
			popupName.css({"left": _posiLeft + "px","top":_posiTop + "px"});//设置position 
		} 

		function popup1(popupName){ 
			var _scrollHeight = $(document).scrollTop(),//获取当前窗口距离页面顶部高度 
			_windowHeight = $(window).height(),//获取当前窗口高度 
			_windowWidth = $(window).width(),//获取当前窗口宽度 
			_popupHeight = popupName.height(),//获取弹出层高度 
			_popupWeight = popupName.width();//获取弹出层宽度 
			_posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight; 
			_posiLeft = (_windowWidth - _popupWeight)/2; 
			popupName.css({"left": _posiLeft + "px","top":"-522px",});//设置position 
		} 

	$('.chat-list').on("click","li",function(){
		$('.chat-box').removeClass("hide");
	});

	$('.operate span').click(function(){
		$('.chat-box').addClass("hide");
	});
