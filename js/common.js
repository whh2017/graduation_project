$(document).ready(function() {	
	/* 关闭登陆或注册界面 */
	$('.register-form .close').click(function(){
		UnMaskIt($('.mask'));
		$('body').css("overflow","auto");
		$('#register-form').addClass("hide");
		$('#login-form').addClass("hide");
	});

	/* 弹出登陆或注册界面 */
	$('.top ul').on("click","li a",function(){
		var index = $(this).parent().index();
		$('body').css("overflow","hidden");
		if(index == 0){
			MaskIt($('.mask'));
			popup($('#login-form'));
			$('#login-form').removeClass("hide");	
		}
		else if(index == 1){
			MaskIt($('.mask'));
			popup($('#register-form'));
			$('#register-form').removeClass("hide");			
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
	$(".chat .btn").click(function(){
  			var cur_imgid = $('.chat-list li.cur img').attr("id"); //获取对面聊天者头像ID

  			alert(cur_imgid);
  		});


	$('#login-form .enroll').click(function(){
		$('#login-form').addClass("hide");
		popup($('#register-form'));
		$('#register-form').removeClass("hide");
	});

	$('#register-form .login').click(function(){
		$('#register-form').addClass("hide");
		popup($('#login-form'));
		$('#login-form').removeClass("hide");
	});

	$('.register-form').on("click",".ipt",function(){
		$('.register-form .ipt').removeClass("cur");
		$(this).addClass("cur");
	});
	/* 存储验证图片数组 */
	var arrUrl = ['images/index/code1.jpg','images/index/code2.jpg','images/index/code3.jpg','images/index/code4.jpg','images/index/code5.jpg','images/index/code6.jpg','images/index/code7.jpg','images/index/code8.jpg'];  
	var arrCode = ['bubw','mauw','4w4j','17en','ayur','jb75','7hpn','wvq3']; 
	var random = null;

	random = parseInt(Math.random()*(arrUrl.length)+0);  	
	$(".register-form .img-box").html("<img src='" + arrUrl[random] + "' alt='"+arrCode[random]+"' />"); 

	$('#change').click(function(){
		random = parseInt(Math.random()*(arrUrl.length)+0);

		$(".register-form .img-box").html("<img src='" + arrUrl[random] + "' alt='"+arrCode[random]+"' />"); 
	});

	/* 表单校验 */
	$('.register-form #mobile').blur(function(){
		var reg =  /^1[34578]\d{9}$/; 
		if($(this).val() == 0){
			return;
		}
		var flag = reg.test($(this).val());
		if(!flag){
			$(this).siblings(".tips").html("格式有误!");
			$(this).removeClass("success");
			$(this).addClass("fail");
		}else{
			$(this).siblings(".tips").html("");
			$(this).removeClass("fail");
			$(this).addClass("success");
		}
	}).click(function(){
		$(this).siblings(".tips").html("");
		$(this).removeClass("fail");
		$(this).removeClass("success");
	});

	$('.register-form #code').blur(function(){
		if($(this).val() == 0){
			return;
		}
		if($(this).val()== arrCode[random]){
			$(this).removeClass("fail");
			$(this).addClass("success");
		}else{
			$(this).removeClass("success");
			$(this).addClass("fail");
		}
	}).click(function(){
		$(this).removeClass("fail");
		$(this).removeClass("success");
	});

	$('.register-form #password').blur(function(){
		if($(this).val() == 0){
			return;
		}
		$(this).addClass("success");
		$('.register-form #confirm').trigger("blur");
	}).click(function(){
		$(this).removeClass("fail");
		$(this).removeClass("success");
	});

	$('.register-form #confirm').blur(function(){
		if($(this).val() == 0){
			return;
		}
		if($(this).val() != $('.register-form #password').val()){
			$(this).removeClass("success");
			$(this).addClass("fail");
			$(this).siblings(".tips").html("验证异常!");
		}
		else{
			$(this).removeClass("fail");
			$(this).addClass("success");
			$(this).siblings(".tips").html("");
		}
	}).click(function(){
		$(this).removeClass("fail");
		$(this).removeClass("success");
	});

	/* 模态弹窗配置 */
	$("#modal-alert").iziModal({
		title: "用户信息注册成功！点击关闭立即刷新。",
		iconClass: 'icon-check',
		headerColor: '#5bbd72',
		overlayClose: false,
		width: 400
	});

	$("#modal-alert1").iziModal({
		title: "登录成功！",
		iconClass: 'icon-check',
		headerColor: '#1da1f2',
		overlayClose: false,
		width: 300
	});

	$("#modal-alert2").iziModal({
		title: "用户信息不存在，请检查你的输入信息是否有误。",
		iconClass: 'icon-check',
		headerColor: '#1da1f2',
		overlayClose: false,
		width: 400
	});

	/* 判断是否有缓存数据 */
	var storage = window.localStorage;
	var read_data = storage.getItem("data");
	var data_obj = JSON.parse(read_data);
	if(read_data){
		console.log("本地有缓存数据，正在进行ajax请求校验....");
		$.ajax({  
			type: "get",  
			url: "data/login.json",  
			dataType: "json",
			data: JSON.stringify(data_obj.phone),  
			success: function (res) {  
	                //alert(res);  
	                //layer.close(ii); 
	                if(res.flag){
	                	console.log("该用户手机号码存在....");
	                	$('.border-lump li:eq(0)').empty().html('<p class="fl">用户&nbsp;</p> <span class="phone fl"></span>');
	                	$('.border-lump .phone').html(res.user_id.phone);
	                	$('.border-lump ul').append('<li><a href="#">个人中心</li>')
	                	$('.border-lump li:eq(1)').empty().html('<p class="cancel fl ml-30">注销</p>');   
	                }
	            }
	        });
	}else{   		
		console.log("不存在的....");
	}

	/* 注册登录逻辑 */

	/* 注册 */
	$('#register-form .btn').click(function(){
		if($('#register-form').hasClass("wobble")){
			$('#register-form').removeClass("wobble");
		}

		var user_data = {
			phone: $('#register-form #mobile').val(),
			password: $('#register-form #password').val()
		};
		var user_sdata = JSON.stringify(user_data);
		if(($('#register-form #mobile').hasClass("success")) && ($('#register-form #code').hasClass("success")) && ($('#register-form #password').hasClass("success")) && ($('#register-form #confirm').hasClass("success"))){
			/* 模拟注册成功之后的效果 */
			UnMaskIt($('.mask'));
				//window.location.reload();
				$('#register-form').addClass("hide");
				$('#modal-alert').iziModal('open');

				/* 存储数据 */
				var b_data = JSON.stringify(user_data);
				storage.setItem("data",b_data);
				console.log(storage.data);
				$('#modal-alert').on('click','.iziModal-button-close',function(){
				//UnMaskIt($('.mask'));
				window.location.reload();
			});
	        /*   上面函数写在success函数里面。
	        $.ajax({  
	          type: "post",  
	          url: "麦贺良你的接口呢我曹尼玛",  
	          dataType: "json",
	          contentType : "application/json; charset=UTF-8",  
	          data: user_sdata,  
	          success: function (res) {  

	                  }  
	            });
	            */
	        }else{
	        	alert("信息不全，请填写完整。");
	        }
	    });
	
	/* 登录 */
	$('#login-form').on('click','.btn',function(){
		var user_logindata = {
			phone: $('#login-form #login-mobile').val(),
			password: $('#login-form #login-password').val()
		};
		var user_slogindata = JSON.stringify(user_logindata);
		$.ajax({  
			type: "GET",  
			dataType: "json",
			data: user_slogindata,  
			url: "data/login.json",     
			success: function (res) {  
					// 返还一个true值   json数据
					if(res.flag){
						var b_data = JSON.stringify(user_logindata);
						storage.setItem("data",b_data);
						UnMaskIt($('.mask'));
						//window.location.reload();
						$('#login-form').addClass("hide");
						$('#modal-alert1').iziModal('open');
						$('#modal-alert1').on('click','.iziModal-button-close',function(){
							$('.border-lump li:eq(0)').empty().html('<p class="fl">用户&nbsp;</p> <span class="phone fl"></span>');
							$('.border-lump .phone').html(res.user_id.phone); // Json数据渲染
							$('.border-lump ul').append('<li><a href="#">个人中心</li>')
							$('.border-lump li:eq(1)').empty().html('<p class="cancel fl ml-30">注销</p>');
						})
					}else{
						$('#modal-alert2').iziModal('open');
					}
				},
				error: function(){
					alert("请求超时或刷新页面重新登陆....")
				}

			});		
	});

	$('.border-lump li:eq(1)').on('click','.cancel',function(){
		var r = confirm("确定要注销吗？")
		if (r==true){
			storage.clear();
			window.location.reload();
		}
	}); 
	$(window).scroll(function(){  
		if($(window).scrollTop()>450){  
			$('.side-navigation .top').fadeIn(600);  
		}  
		else{$('.side-navigation .top').fadeOut(600);}  
	});

	$('.header-lump li:eq(3)').click(function(){
		var storage = window.localStorage;
		var read_data = storage.getItem("data");
		var data_obj = JSON.parse(read_data);
		if(read_data){
			console.log("本地有缓存数据，正在进行ajax请求校验....");
			$.ajax({  
				type: "get",  
				url: "data/lubenwei.json",  
				dataType: "json",
				data: JSON.stringify(data_obj.phone),  
				success: function (res) {  
	                //alert(res);  
	                //layer.close(ii); 
	                if(res.flag){
	                	console.log("该用户手机号码存在....");
	                	self.location='person-center.html';
	                }else{
	                	console.log("该用户手机号码不存在....");
	                	self.location='login.html';
	                }	           
	            },
	            error: function(res){
	            	console.log("ajax请求失败....");
	            }
	        });
		}else{
			console.log("本地无缓存数据....");
			self.location='login.html';
		}
	});
});
