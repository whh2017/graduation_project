$(document).ready(function(){
	/* 判定是否有缓存数据 */
	var storage = window.localStorage;
	var read_data = storage.getItem("data");
	var data_obj = JSON.parse(read_data);
	var fllag = false; // 是否有缓存标志位。
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
				all_page = res.total;   
				console.log("Plus数据共有"+all_page+"页....")    
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){  
				console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
				console.log("错误类型textStatus: " + textStatus);  
				console.log("异常对象errorThrown: " + errorThrown);  
			}  
		});

	   /* 分页逻辑 */
	 //   var content;
	 //   $('.pagination-lump').on('click','li',function(){ 	
	 //   	var lastflag = false;
	 //   	var now_paginindex = $('.pagination-lump li.cur').index();
	 //   	if($(this).index() == 11){
	 //   		content = $('.pagination-lump').html();
	 //   		var noww_paginindex = ++now_paginindex;
	 //   		if(noww_paginindex == 11){
	 //   			console.log("准备换页咯....");
	 //   			var origin_page = $('.pagination-lump li.cur').find("p").html();
	 //   			var new_page = parseInt(origin_page) + 10;
	 //   			var page_count = 0;
	 //   			if(new_page < all_page){
	 //   				console.log("比JSON小咯....");
	 //   				$('.pagination-lump li:eq(1)').addClass("cur").siblings().removeClass("cur");
	 //   				for( var s = 1; s< origin_page; s++){
	 //   					$('.pagination-lump li:eq('+s+')').find("p").html(++origin_page);
	 //   					page_count++;
	 //   					if(page_count == 10){
	 //   						return;
	 //   					}
	 //   				}
	 //   			}else{
	 //   				content = $('.pagination-lump').html();
	 //   				console.log("比JSON大咯....");
	 //   				var ss = all_page - origin_page;
	 //   				$('.pagination-lump li:eq(1)').addClass("cur").siblings().removeClass("cur");
	 //   				for( var s = 1; s<= new_page; s++){
	 //   					if(s<=ss){
	 //   						$('.pagination-lump li:eq('+s+')').find("p").html(++origin_page);
	 //   					}else{
	 //   						$('.pagination-lump li:eq('+s+')').addClass("hide");
	 //   						$('.pagination-lump li:eq(12)').removeClass("hide");
	 //   					}
	 //   				}

	 //   			}
	 //   			return;
	 //   		}
	 //   		$('.pagination-lump li:eq('+noww_paginindex+')').addClass("cur").siblings().removeClass("cur");	
	 //   		console.log("下一页....上个被点击的索引值为" + noww_paginindex);
	 //   	}else if($(this).index() == 0){
	 //   		content = $('.pagination-lump').html();
	 //   		$('.pagination-lump li').removeClass("hide");
	 //   		$('.pagination-lump li:eq(1)').addClass("cur").siblings().removeClass("cur");
	 //   		for( var zero = 1; zero < $('.pagination-lump li.last').index()-1; zero++){
	 //   			$('.pagination-lump li:eq('+zero+')').find("p").html(zero);
	 //   		}
	 //   		$('.pagination-lump li:eq(11)').find("p").html("下一页");

	 //   	}
	 //   	else if($(this).index() == 12){
	 //   		console.log("返回....");
	 //   		if($('.pagination-lump li.cur').index() != 1 )
	 //   		{
	 //   			$(".pagination-lump").empty().append(content);
	 //   		}
	 //   		 // $('.pagination-lump li').removeClass("hide");
	 //   		 // $('.pagination-lump li:eq(1)').addClass("cur").siblings().removeClass("cur");
	 //   		// for( var zero = all_page, ii = 1; zero >=all_page-10; zero--){
	 //   		// 	ii++;
	 //   		// 	$('.pagination-lump li:nth-last-child('+ii+')').find("p").html(zero);
	 //   		// }
	 //   	}
	 //   	else{
	 //   		content = $('.pagination-lump').html();
	 //   		console.log("不是下一页....上个被点击的索引值为"+ now_paginindex)
	 //   		$(this).addClass("cur").siblings().removeClass("cur");	
	 //   	}
	 //   		 var cur_pagin = $('.pagination-lump li.cur p').html(); //获取当前点击页数
	 //   	 // var next_pagin = $('.pagination-lump li.cur p').html();
	 //   	 $('.left-content .content ul').empty();   	
	 //   	 $.ajax({  
	 //   	 	type: "get",  
		// 	// 老麦提供接口
		// 	url: "data/bbs_li2.json",   // 模拟第2页数据
		// 	dataType: "json",
		// 	data: cur_pagin, /*初始化只加载8条，根据用户需要点击加载，才继续加载8条，以此类推*/
		// 	success: function (res) {  
		// 		var len = res.item.length;
		// 		var i = 0;
		// 		for( i = 0; i < len; i++){
		// 			$('.left-content .content ul').append('<li class="clearfix"><div class="icon fl"><a href="#"><img src='+res.item[i].img+'></a></div><div class="fl"><div class="clearfix tt"><span class="nor fl">'+res.item[i].topic+'</span><a class="title fl" href="login.html">'+res.item[i].tt+'</a></div><div class="txt"><p><span class="w">'+res.item[i].user_name+'</span>&nbsp;发表于：<span class="time">'+res.item[i].start_time+'</span>&nbsp;最新回复：<span class="new">'+res.item[i].lastest_time+'</span></p></div></div><div class="fr mt-10 mr-10"><span class="comment">'+res.item[i].comment+'</span></div><div style="display: none;" class="tooltip"><div id='+"tooltip"+i+'><div class="clearfix"><div class="img-box fl"><img src='+res.item[i].img+'><div class="talk clearfix"><a href="#" class="fl">+私聊</a></div></div><div class="h-102 fl"><p class="name">'+res.item[i].user_mes.name+'</p><p class="school">'+res.item[i].user_mes.school+'</p><span class="sex">'+res.item[i].user_mes.sex+'</span><span class="year ml-5">'+res.item[i].user_mes.year+'<span><p>上次登陆时间：<span class="time">2017-10-17</span></p></div></div></div></div></li>');
		// 			// top 表示是否为置顶
		// 			if(res.item[i].top){
		// 				$('.left-content li span.nor').removeClass("nor").addClass("kind");
		// 				$('.left-content li a.title').addClass("light");
		// 			}
		// 		}
		// 		$('.left-content .content').on('mouseover','img',function(){
		// 			var now_index = $(this).parents("li").index();
		// 			tooltip.pop(this, '#tooltip'+now_index, {position:1, offsetX:-20, effect:'slide'})
		// 		}); 
		// 	},
		// 	error:function(XMLHttpRequest, textStatus, errorThrown){  
		// 		console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
		// 		console.log("错误类型textStatus: " + textStatus);  
		// 		console.log("异常对象errorThrown: " + errorThrown);  
		// 	}  
		// });   	
	 //    });

	//$('.progress-lump .progress span').html(i);
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

	var in_index;
	function update(){
		console.log("当前传后台的值是" + $('.pagination-lump li').eq(++in_index).find("p").html());
		$.ajax({  
			type: "get",  
				// 老麦提供接口
				url: "data/bbs_li.json",  
				data: JSON.stringify($('.pagination-lump li').eq(++in_index).find("p").html()),
				dataType: "json",
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
					all_page = res.total;   
					console.log("Plus数据共有"+all_page+"页....")    
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){  
					console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
					console.log("错误类型textStatus: " + textStatus);  
					console.log("异常对象errorThrown: " + errorThrown);  
				}  
			});
	}
	/* 分页 */
	var origin_content = $('.pagination-lump').html();
	$('.pagination-lump').on('click','li',function(){
		console.log("分页逻辑开始....");
		in_index = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
					if( in_index > 1 && in_index < 12){  //页数被点击
						console.log("当前页数为" + --in_index);
						update();
						
					}else if(in_index == 0){     //首页被点击
						console.log("首页....");
						$('.pagination-lump').empty().append(origin_content);
						in_index = 1;
						$.ajax({  
							type: "get",  
				// 老麦提供接口
				url: "data/bbs_li.json",  
				data: JSON.stringify(in_index),
				dataType: "json",
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
					all_page = res.total;   
					console.log("Plus数据共有"+all_page+"页....")    
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){  
					console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
					console.log("错误类型textStatus: " + textStatus);  
					console.log("异常对象errorThrown: " + errorThrown);  
				}  
			});
					}else if(in_index == 13){
						in_index = 999;
						console.log("当前传后台的值是" + in_index);
						$.ajax({  
							type: "get",  
				// 老麦提供接口
				url: "data/bbs_li.json",  
				data: JSON.stringify(in_index),
				dataType: "json",
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
					all_page = res.total;   
					console.log("Plus数据共有"+all_page+"页....")    
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){  
					console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
					console.log("错误类型textStatus: " + textStatus);  
					console.log("异常对象errorThrown: " + errorThrown);  
				}  
			});
						
					}else if(in_index == 1){
						$('.pagination-lump li').removeClass("hide");
						console.log("上一页....");
						var cur_first = $('.pagination-lump li').eq(++in_index).find("p").html();
						var after_first = cur_first;
						console.log(cur_first);
						var cha = $('.pagination-lump li').eq(++in_index).find("p").html() - 10;
						if(cha <= 0){
							console.log("当前为第一页！");
						}else if(cha>0){
							for(var last = 11; last >= 2; last--){
								$('.pagination-lump li').eq(last).find("p").html(--after_first);
							}
						}	
					}else if(in_index == 12){
						var no_next = false;
						console.log("下一页....");
						var cur_last = $('.pagination-lump li').eq(--in_index).find("p").html();
						console.log(cur_last);
						var after_last = cur_last;
						var duo = cur_last + 10;
						if(duo <= all_page){
							console.log("1");
							var ii = all_page % 10;
							for( var front = 2; front < 12; front++){
								$('.pagination-lump li').eq(front).find("p").html(++cur_last);
								var after_last = cur_last;
								var duo = cur_last + 10;
								if($('.pagination-lump li').eq(front).find("p").html() > all_page){
									$('.pagination-lump li').eq(front).addClass("hide");
								}
							}
						}else{
							console.log("2");
							$('.pagination-lump li').each(function(){
								if($(this).find("p").html() == all_page){
									no_next = true;
								}	
							});
							if(!no_next){
								for( var front = 2; front < 12; front++){
									$('.pagination-lump li').eq(front).find("p").html(++cur_last);
								}
							}
						}

					}
					
					
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
