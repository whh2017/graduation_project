$(document).ready(function(){
	/* 判定是否有缓存数据 */
	var storage = window.localStorage;
	var read_data = storage.getItem("data");
	var data_obj = JSON.parse(read_data);
	var fllag = false; // 是否有缓存标志位。
	if(read_data){
		console.log("本地有缓存数据，正在进行ajax请求校验....");
		$.ajax({  
			type: "get",  
			// 老麦提供接口
			url: "../../data/bbs_test.json",  
			dataType: "json",
			data: JSON.stringify(data_obj.phone),  
			success: function (res) {  
	                //alert(res);  
	                //layer.close(ii); 
	                if(res.flag){
	                	console.log("该用户手机号码存在....");
	                	$('.head').find("img").attr("src",res.user_id.item_head_src);
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

	                }	           
	            },
	            error: function(res){
	            	console.log("ajax请求失败....");
	            }
	        });
	}else{
		console.log("本地无缓存数据....");
	}

	/* 动态刷新主题列表 */


	//$('.progress-lump .progress span').html(i);
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

	$('.final_submit').click(function(){
		uploader.upload();
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
