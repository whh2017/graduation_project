$(document).ready(function(){
	/* 判定是否有缓存数据 */
	var storage = window.localStorage;
	var read_data = storage.getItem("data");
	var data_obj = JSON.parse(read_data);
	var fllag = false; // 是否有缓存标志位。
	var user_phone;
	var all_page;
	if(read_data){
		console.log("本地有缓存数据，正在进行ajax请求校验....");
		$.ajax({  
			type: "get",  
			// 老麦提供接口
			url: "data/bbs_test.json",  
			dataType: "json",
			data: JSON.stringify(data_obj.phone),  
			success: function (res) {  
	                //alert(res);  
	                //layer.close(ii); 
	                if(res.flag){
	                	console.log("该用户手机号码存在....");
	                	$('.head').find("img").attr("src",res.user_id.head_src);
	                	if(res.user_id.name==""){
	                		console.log("该用户昵称未填写....");
	                		$('.head').find("p").empty().html("用户&nbsp;"+ res.user_id.phone +"&nbsp;").addClass("blue");
	                		$('.head').append('<a class="ml-10 over" href="javascript:void(0);">注销</a>')
	                		fllag = true;
	                	}else{
	                		console.log("该用户昵称已填写....");
	                		$('.head').find("p").empty().html(""+ res.user_id.name).addClass("blue");
	                		$('.head').append('<a class="ml-10 over" href="javascript:void(0);">注销</a>')
	                		fllag = true;
	                	}
	                	user_phone = res.user_id.phone;
	                }else{
	                	console.log("该用户手机号码不存在....");
	                	fllag = false;
	                }	           
	            },
	            error:function(XMLHttpRequest, textStatus, errorThrown){  
	            	console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
	            	console.log("错误类型textStatus: " + textStatus);  
	            	console.log("异常对象errorThrown: " + errorThrown);  
	            }  
	        });
	}else{
		console.log("本地无缓存数据....");
		fllag = false;
	}
	/* 动态刷新主题列表 
	   初始化只加载8条
	   默认按照最新时间排序刷新，另外弄条按照评论数据的多少来刷新列表（两条列表对应不同url）。
	   */
	   $.ajax({  
	   	type: "get",  
			// 老麦提供接口
			url: "data/bbs_li.json",  
			dataType: "json",
			// data:update_count, //每次加载最后一条的索引值
			success: function (res) {  		
				var len = res.item.length;
				var i = 0;
				for( i = 0; i < len; i++){
					$('.left-content .content ul').append('<li class="clearfix"><div class="icon fl"><a href="#"><img src='+res.item[i].img+'></a></div><div class="fl"><div class="clearfix tt"><span class="nor fl">'+res.item[i].topic+'</span><a class="title fl" href="#">'+res.item[i].tt+'</a></div><div class="txt"><p><span class="w">'+res.item[i].user_name+'</span>&nbsp;发表于：<span class="time">'+res.item[i].start_time+'</span>&nbsp;最新回复：<span class="new">'+res.item[i].lastest_time+'</span></p></div></div><div class="fr mt-10 mr-10"><span class="comment">'+res.item[i].comment+'</span></div><div style="display: none;" class="tooltip"><div id='+"tooltip"+i+'><div class="clearfix"><div class="img-box fl"><img src='+res.item[i].img+'><div class="talk clearfix"><a href="#" class="fl">+私聊</a></div></div><div class="h-102 fl"><p class="name">'+res.item[i].user_mes.name+'</p><p class="school">'+res.item[i].user_mes.school+'</p><span class="sex">'+res.item[i].user_mes.sex+'</span><span class="year ml-5">'+res.item[i].user_mes.year+'<span><p>上次登陆时间：<span class="time">2017-10-17</span></p></div></div></div></div></li>');
					// top 表示是否为置顶
					if(res.item[i].top){
						$('.left-content li span.nor').removeClass("nor").addClass("kind");
						$('.left-content li a.title').addClass("light");
					}
					$('.left-content li a.title').attr("href",res.item[i].a_href);
				}
				console.log("动态列表加载完毕....");
				$('.left-content .content').on('mouseover','img',function(){
					var now_index = $(this).parents("li").index();
					tooltip.pop(this, '#tooltip'+now_index, {position:1, offsetX:-20, effect:'slide'})
				});    
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){  
				console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
				console.log("错误类型textStatus: " + textStatus);  
				console.log("异常对象errorThrown: " + errorThrown);  
			}  
		});

	   /* 分页逻辑实现 */
	   var cur_index;
	   $('.pagination-lump .first').click(function(){
	   	cur_index = 1;
	   	console.log("传递给后台的页数为" + cur_index);
	   	$.ajax({
	   		type: "POST",  
			// 老麦提供接口
			url: "data/bbs_li2.json",  
			dataType: "json",
			data:JSON.stringify(cur_index),		
			// data:update_count, //每次加载最后一条的索引值
			success: function (res) {  
				$('.left-content .content ul').empty();
				var len = res.item.length;
				var i = 0;
				for( i = 0; i < len; i++){
					$('.left-content .content ul').append('<li class="clearfix"><div class="icon fl"><a href="#"><img src='+res.item[i].img+'></a></div><div class="fl"><div class="clearfix tt"><span class="nor fl">'+res.item[i].topic+'</span><a class="title fl" href="#">'+res.item[i].tt+'</a></div><div class="txt"><p><span class="w">'+res.item[i].user_name+'</span>&nbsp;发表于：<span class="time">'+res.item[i].start_time+'</span>&nbsp;最新回复：<span class="new">'+res.item[i].lastest_time+'</span></p></div></div><div class="fr mt-10 mr-10"><span class="comment">'+res.item[i].comment+'</span></div><div style="display: none;" class="tooltip"><div id='+"tooltip"+i+'><div class="clearfix"><div class="img-box fl"><img src='+res.item[i].img+'><div class="talk clearfix"><a href="#" class="fl">+私聊</a></div></div><div class="h-102 fl"><p class="name">'+res.item[i].user_mes.name+'</p><p class="school">'+res.item[i].user_mes.school+'</p><span class="sex">'+res.item[i].user_mes.sex+'</span><span class="year ml-5">'+res.item[i].user_mes.year+'<span><p>上次登陆时间：<span class="time">2017-10-17</span></p></div></div></div></div></li>');
					// top 表示是否为置顶
					if(res.item[i].top){
						$('.left-content li span.nor').removeClass("nor").addClass("kind");
						$('.left-content li a.title').addClass("light");
					}
					$('.left-content li a.title').attr("href",res.item[i].a_href);
				}
				console.log("动态列表加载完毕....");
				$('.left-content .content').on('mouseover','img',function(){
					var now_index = $(this).parents("li").index();
					tooltip.pop(this, '#tooltip'+now_index, {position:1, offsetX:-20, effect:'slide'})
				});
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){  
				console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
				console.log("错误类型textStatus: " + textStatus);  
				console.log("异常对象errorThrown: " + errorThrown);  
			}  	
		})
	   });

	   $('.pagination-lump .prev').click(function(){
	   	cur_index = $(".cur-page span").html();
	   	if(cur_index != 1){
	   		cur_index--;
	   		console.log("传递给后台的页数为" + cur_index);
	   		$.ajax({
	   			type: "POST",  
			// 老麦提供接口
			url: "data/bbs_li2.json",  
			dataType: "json",
			data:JSON.stringify(cur_index),		
			// data:update_count, //每次加载最后一条的索引值
			success: function (res) {  
				$('.left-content .content ul').empty();
				var len = res.item.length;
				var i = 0;
				for( i = 0; i < len; i++){
					$('.left-content .content ul').append('<li class="clearfix"><div class="icon fl"><a href="#"><img src='+res.item[i].img+'></a></div><div class="fl"><div class="clearfix tt"><span class="nor fl">'+res.item[i].topic+'</span><a class="title fl" href="#">'+res.item[i].tt+'</a></div><div class="txt"><p><span class="w">'+res.item[i].user_name+'</span>&nbsp;发表于：<span class="time">'+res.item[i].start_time+'</span>&nbsp;最新回复：<span class="new">'+res.item[i].lastest_time+'</span></p></div></div><div class="fr mt-10 mr-10"><span class="comment">'+res.item[i].comment+'</span></div><div style="display: none;" class="tooltip"><div id='+"tooltip"+i+'><div class="clearfix"><div class="img-box fl"><img src='+res.item[i].img+'><div class="talk clearfix"><a href="#" class="fl">+私聊</a></div></div><div class="h-102 fl"><p class="name">'+res.item[i].user_mes.name+'</p><p class="school">'+res.item[i].user_mes.school+'</p><span class="sex">'+res.item[i].user_mes.sex+'</span><span class="year ml-5">'+res.item[i].user_mes.year+'<span><p>上次登陆时间：<span class="time">2017-10-17</span></p></div></div></div></div></li>');
					// top 表示是否为置顶
					if(res.item[i].top){
						$('.left-content li span.nor').removeClass("nor").addClass("kind");
						$('.left-content li a.title').addClass("light");
					}
					$('.left-content li a.title').attr("href",res.item[i].a_href);
				}
				console.log("动态列表加载完毕....");
				$('.left-content .content').on('mouseover','img',function(){
					var now_index = $(this).parents("li").index();
					tooltip.pop(this, '#tooltip'+now_index, {position:1, offsetX:-20, effect:'slide'})
				});
				$(".cur-page span").html(cur_index);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){  
				console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
				console.log("错误类型textStatus: " + textStatus);  
				console.log("异常对象errorThrown: " + errorThrown);  
			}  	
		});
	   	}
	   });

	   $('.pagination-lump .next').click(function(){
	   	cur_index = $(".cur-page span").html();
	   	cur_index++;
	   	console.log("传递给后台的页数为" + cur_index);
	   	$.ajax({
	   		type: "POST",  
			// 老麦提供接口
			url: "data/bbs_li2.json",  
			dataType: "json",
			data:JSON.stringify(cur_index),		
			// data:update_count, //每次加载最后一条的索引值
			success: function (res) {  
				$('.left-content .content ul').empty();
				var len = res.item.length;
				var i = 0;
				for( i = 0; i < len; i++){
					$('.left-content .content ul').append('<li class="clearfix"><div class="icon fl"><a href="#"><img src='+res.item[i].img+'></a></div><div class="fl"><div class="clearfix tt"><span class="nor fl">'+res.item[i].topic+'</span><a class="title fl" href="#">'+res.item[i].tt+'</a></div><div class="txt"><p><span class="w">'+res.item[i].user_name+'</span>&nbsp;发表于：<span class="time">'+res.item[i].start_time+'</span>&nbsp;最新回复：<span class="new">'+res.item[i].lastest_time+'</span></p></div></div><div class="fr mt-10 mr-10"><span class="comment">'+res.item[i].comment+'</span></div><div style="display: none;" class="tooltip"><div id='+"tooltip"+i+'><div class="clearfix"><div class="img-box fl"><img src='+res.item[i].img+'><div class="talk clearfix"><a href="#" class="fl">+私聊</a></div></div><div class="h-102 fl"><p class="name">'+res.item[i].user_mes.name+'</p><p class="school">'+res.item[i].user_mes.school+'</p><span class="sex">'+res.item[i].user_mes.sex+'</span><span class="year ml-5">'+res.item[i].user_mes.year+'<span><p>上次登陆时间：<span class="time">2017-10-17</span></p></div></div></div></div></li>');
					// top 表示是否为置顶
					if(res.item[i].top){
						$('.left-content li span.nor').removeClass("nor").addClass("kind");
						$('.left-content li a.title').addClass("light");
					}
					$('.left-content li a.title').attr("href",res.item[i].a_href);
				}
				console.log("动态列表加载完毕....");
				$('.left-content .content').on('mouseover','img',function(){
					var now_index = $(this).parents("li").index();
					tooltip.pop(this, '#tooltip'+now_index, {position:1, offsetX:-20, effect:'slide'})
				});
				$(".cur-page span").html(cur_index);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){  
				console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
				console.log("错误类型textStatus: " + textStatus);  
				console.log("异常对象errorThrown: " + errorThrown);  
			}  	
		});
	   });

	   $('.pagination-lump .search').click(function(){
	   	cur_index = $(".pagination-lump .ipt").val();
	   	if(cur_index != ""){
	   		console.log("传递给后台的页数为" + cur_index);
	   		$.ajax({
	   			type: "POST",  
			// 老麦提供接口
			url: "data/bbs_li2.json",  
			dataType: "json",
			data:JSON.stringify(cur_index),		
			// data:update_count, //每次加载最后一条的索引值
			success: function (res) {  
				$('.left-content .content ul').empty();
				var len = res.item.length;
				var i = 0;
				for( i = 0; i < len; i++){
					$('.left-content .content ul').append('<li class="clearfix"><div class="icon fl"><a href="#"><img src='+res.item[i].img+'></a></div><div class="fl"><div class="clearfix tt"><span class="nor fl">'+res.item[i].topic+'</span><a class="title fl" href="#">'+res.item[i].tt+'</a></div><div class="txt"><p><span class="w">'+res.item[i].user_name+'</span>&nbsp;发表于：<span class="time">'+res.item[i].start_time+'</span>&nbsp;最新回复：<span class="new">'+res.item[i].lastest_time+'</span></p></div></div><div class="fr mt-10 mr-10"><span class="comment">'+res.item[i].comment+'</span></div><div style="display: none;" class="tooltip"><div id='+"tooltip"+i+'><div class="clearfix"><div class="img-box fl"><img src='+res.item[i].img+'><div class="talk clearfix"><a href="#" class="fl">+私聊</a></div></div><div class="h-102 fl"><p class="name">'+res.item[i].user_mes.name+'</p><p class="school">'+res.item[i].user_mes.school+'</p><span class="sex">'+res.item[i].user_mes.sex+'</span><span class="year ml-5">'+res.item[i].user_mes.year+'<span><p>上次登陆时间：<span class="time">2017-10-17</span></p></div></div></div></div></li>');
					// top 表示是否为置顶
					if(res.item[i].top){
						$('.left-content li span.nor').removeClass("nor").addClass("kind");
						$('.left-content li a.title').addClass("light");
					}
					$('.left-content li a.title').attr("href",res.item[i].a_href);
				}
				console.log("动态列表加载完毕....");
				$('.left-content .content').on('mouseover','img',function(){
					var now_index = $(this).parents("li").index();
					tooltip.pop(this, '#tooltip'+now_index, {position:1, offsetX:-20, effect:'slide'})
				});
				$(".cur-page span").html(cur_index);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){  
				alert("请求服务器失败,请重试....");
				console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
				console.log("错误类型textStatus: " + textStatus);  
				console.log("异常对象errorThrown: " + errorThrown);  
			}  	
		});
	   	}else{
	   		alert("请输入有效数字！");
	   	}
	   });

	// 模拟进度加载动画
	var j = 0;
	$('.progress .now').animate({width:"25%"},2500);
	var t = setInterval(function(){
		$('.progress-lump .progress span').html(++j);
		if(j==25){
			clearInterval(t);
		}
	},100)

	$('.head').on('click',".over",function(){
		var re = confirm("确定要注销吗？")
		if (re==true){
			storage.clear();
			window.location.reload();
		}
	});
	$('.chat-list').on("click","li",function(){
		if($(this).index()!= 0){
			$('.chat-box').removeClass("hide");
			var index= 2;
			$('.chat-list li:eq('+index+')').addClass("sjb");
				$(this).addClass("cur").siblings().removeClass("cur"); // 这里加多一行这个。
			}
		});
	$('.operate span').click(function(){
		$('.chat-box').addClass("hide");
		$('.chat-list li').removeClass("cur");
	});

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

	/* 显示发布帖子div */
	$('.left-content .edit').click(function(){
		if(!fllag){
			$('#modal-alert').iziModal('open');
		}else{
			MaskIt1($('.mask'));
			$('.editor-lump').removeClass("nolook")
			// $('.editor-lump').fadeIn();
				var _scrollHeight = $(document).scrollTop(),//获取当前窗口距离页面顶部高度 
				_windowHeight = $(window).height(),//获取当前窗口高度 	
				_popupHeight = $('.editor-lump').height(),//获取弹出层高度 
				_posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight; 
				$('.editor-lump').animate({top: _posiTop + "px"},700);
			}
		});


	$('.edit-content .stop').click(function(){
		UnMaskIt1($('.mask'));
		// $('.editor-lump').fadeOut();
		$('.editor-lump').addClass("nolook")
		$('.editor-lump').animate({top: "-522px"},200);
	});

	$("#modal-alert").iziModal({
		title: "请先登录...",
		iconClass: 'icon-check',
		headerColor: '#EE82EE',
		overlayClose: false,
		width: 400
	});

	$("#modal-alert2").iziModal({
		title: "发布Plus动态成功！",
		iconClass: 'icon-check',
		headerColor: '#2ea7e0',
		overlayClose: false,
		width: 400
	});

	$('#modal-alert').on('click','.iziModal-button-close',function(){
				//UnMaskIt($('.mask'));
				self.location='login.html';
			});

	/* 上传插件 */
	var uploader = WebUploader.create({

    // 选完文件后，是否自动上传。
    auto: true,

    // swf文件路径
    swf: 'js/Uploader.swf',

    // 文件接收服务端。
    server: 'fileupload.php',

    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '.upload',

    // 只允许选择图片文件。
    accept: {
    	title: 'Images',
    	extensions: 'gif,jpg,jpeg,bmp,png',
    	mimeTypes: 'image/*'
    }
});
	var counter = 0; //判定当前索引.
    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
    	$list = $('.img-preview');
    // $list为容器jQuery实例
   	// $list.append( $li );
   	if(counter>3){
   		alert("最多上传4张图片！");
   		return;
   	}else{
   		$img = '<img  id='+file.id+'>'
   		$list.append($img);
   		counter++;
	    // 创建缩略图
	    // 如果为非图片文件，可以不用调用此方法。
	    // thumbnailWidth x thumbnailHeight 为 100 x 100
	    uploader.makeThumb( file, function( error, src ) {
	    	if ( error ) {
	    		$img.replaceWith('<span>不能预览</span>');
	    		return;
	    	}
	    	$list.find('#'+file.id).attr('src',src);
	    }, 100, 100 );
	}
});
    uploader.on( 'uploadProgress', function( file, percentage ) {	

    });
    uploader.on('startUpload',function( file ){

    });
	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on( 'uploadSuccess', function( file ) {
		// $( '#'+file.id ).addClass('upload-state-done');
		console.log("上传成功");
		alert("第"+counter+"张图片上传成功！");
		$('#'+file.id ).addClass("success");
	});

	// 文件上传失败，显示上传出错。
	uploader.on( 'uploadError', function( file ) {
		console.log("上传失败");
		alert("第"+counter+"张图片上传失败！请重新上传。")
		var $cur = $( '#'+file.id );
		$cur.remove();
		counter--;
		uploader.removeFile(file);
	});
	// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on( 'uploadComplete', function( file ) {
		// $( '#'+file.id ).find('.progress').remove();	
		//$img.removeClass(file.id);
		// setTimeout(function(){
		// 	$( '#'+file.id ).find('.progress').remove();
		// },2000)	
		 //alert("sjb");
		});


	/*  发布Plus逻辑 */
	$('.final_submit').click(function(){
		//uploader.upload();
		var sender_time = new Date();
		var send_plus = {
			user_phone: user_phone,
			sender_id : $('.header-box li img').attr("id"),
			plus_type : $('.editor-lump select').val(),
			plus_title : $('.editor-lump .ipt').val(),
			plus_txt : $('.editor-lump textarea').val(),
			send_time : sender_time.toLocaleDateString()
		}

		if(($('.editor-lump .ipt').val() != '') && ($('.editor-lump textarea').val() != '')){
			$.ajax({  
				type: "post",  
					// 老麦提供接口
					url: "data/moni.json",  
					dataType: "json",
					data: JSON.stringify(send_plus),  
					success: function (res) {  
						$('#modal-alert2').iziModal('open');
					},
					error: function(res){
						console.log("ajax请求失败....");
					}
				});
		}else{
			alert("请填充完整内容！");
		}
	});

	$('#modal-alert2').on('click','.iziModal-button-close',function(){
				//UnMaskIt($('.mask'));
				window.location.reload();
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
