$(document).ready(function(){
	/* 判定是否有缓存数据 */
	var storage = window.localStorage;
	var read_data = storage.getItem("data");
	var data_obj = JSON.parse(read_data);
	var fllag = false; // 是否有缓存标志位。
	var user_phone;
	var plus_id = $('.bbs-container .article').attr('id');
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
	                	user_phone = res.user_id.phone;
	                }else{
	                	console.log("该用户手机号码不存在....");
	                	fllag = false;
	                }	           
	            },
	            error: function(res){
	            	console.log("ajax请求失败....");
	            }
	        });
	}else{
		console.log("本地无缓存数据....");
		fllag = false;
	}
	$('.comment-lump .mes ul').empty();

	/* 刷新用户评论逻辑 */
	$.ajax({  
		type: "get",  
			// 老麦提供接口 
			data: JSON.stringify(plus_id),  
			// 帖子ID附在类名为 article div结构上。
			url: "../../data/bbs_conment.json",  
			dataType: "json",
			success: function (res) {  
	                //alert(res);  
	                //layer.close(ii); 
	                if(res.flag){
	                	console.log("刷新评论...");
	                	console.log(res.count);
	                	$('.comment-lump .tt em').html(res.count);
	                	var com_length = res.comment_mes.length;
	                	for( var com_i = 0 ; com_i < com_length ; com_i++)
	                	{
	                		$('.comment-lump .mes ul').append('<li class="clearfix"><div class="img-box fl"><img src='+res.comment_mes[com_i].head_img+' class="comment-img"></div><div class="txt fl"><span class="comment-name">'+res.comment_mes[com_i].comment_name+'</span><span class="comment-time">'+res.comment_mes[com_i].comment_time+'</span><p class="comment-txt">'+res.comment_mes[com_i].comment_content+'</p></div>			</li>')
	                	}
	                }else{
	                	console.log("没有评论....");
	                }	           
	            },
	            error: function(res){
	            	console.log("ajax请求失败....");
	            }
	        });
	// 模拟加载开发进度
	//$('.progress-lump .progress span').html(i);
	var j = 0;
	$('.progress .now').animate({width:"40%"},4000);
	var t = setInterval(function(){
		$('.progress-lump .progress span').html(++j);
		if(j==40){
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
	$("#modal-alert").iziModal({
		title: "请先登录...",
		iconClass: 'icon-check',
		headerColor: '#EE82EE',
		overlayClose: false,
		width: 400
	});
	$("#modal-alert2").iziModal({
		title: "评论成功！",
		iconClass: 'icon-check',
		headerColor: '#09f',
		overlayClose: false,
		width: 400
	});

	$('#modal-alert').on('click','.iziModal-button-close',function(){
				//UnMaskIt($('.mask'));
				self.location='../../login.html';
			});

		$('#modal-alert2').on('click','.iziModal-button-close',function(){
				//UnMaskIt($('.mask'));
				window.location.reload();
			});


	/* 发表评论 */
	$('.report-comment button').click(function(){
		if(!fllag){			// 判断是否登录
			$('#modal-alert').iziModal('open');
		}else{
			var comment_nowtime = new Date();
			/* 绑定当前登录用户id，传入后台 
			   帖子显示时间格式为 XXXX-XX-XX 传给你的是为 XXXX/XX/XX 处理一下。
			   */
			   var comment_mes = {
			   	plus_id: plus_id,
			   	user_phone: user_phone,
			   	user_id : $('.header-box li img').attr("id"),
			   	comment_txt : $('.report-comment textarea').val(),
			   	comment_time : comment_nowtime.toLocaleDateString()
			   }
			   if($('.report-comment textarea').val() != ''){
			   	$.ajax({  
			   		type: "post",  
				// 老麦提供接口
				url: "../../data/moni.json",  
				dataType: "json",
				data: JSON.stringify(comment_mes),  
				success: function (res) {  
					$('#modal-alert2').iziModal('open');

				},
				error: function(res){
					console.log("ajax请求失败....");
				}
			});
			   }else{
			   	alert("请输入评论内容！");
			   }
			}
		})
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
