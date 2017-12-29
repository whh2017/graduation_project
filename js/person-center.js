
$(document).ready(function(){

	/* 判定浏览器有否有缓存数据，没有则进入登录注册界面，没有请求后台ajax局部刷新界面 */
	var storage = window.localStorage;
	var read_data = storage.getItem("data");
	var data_obj = JSON.parse(read_data);
	if(read_data){
		console.log("本地有缓存数据，正在进行ajax请求校验....");
		$.ajax({  
			type: "get",  
			// 老麦提供接口
			url: "data/lubenwei.json",  
			dataType: "json",
			data: JSON.stringify(data_obj.phone),  
			success: function (res) {  
	                //alert(res);  
	                //layer.close(ii); 
	                if(res.flag){
	                	console.log("该用户手机号码存在....");

	                	/* 编辑资料板块刷新数据 */
	                	$('.welcome-lump .phone').html(res.user_id.phone);
	                	$('.welcome-lump .point').html(res.user_id.point);
	                	$('.show-message .id').html(res.user_id.id);
	                	$('.show-message .name').html(res.user_id.name);
	                	$('.show-message .sex').html(res.user_id.sex);
	                	$('.show-message .year').html(res.user_id.year);
	                	$('.show-message .school').html(res.user_id.school);
	                	$('.show-message .major').html(res.user_id.major);
	                	$('.show-message .loc').html(res.user_id.loc);
	                	$('.show-message .rank').html(res.user_id.rank);
	                	$('.show-message .img-preview').attr("src",res.user_id.user_img)

	                	$('.change #name').val(res.user_id.name);
	                	$('.change #sex').val(res.user_id.sex);
	                	$('.change #year').val(res.user_id.year);
	                	$('.change #school').val(res.user_id.school);
	                	$('.change #major').val(res.user_id.major);
	                	$('.change #loc').val(res.user_id.loc);
	                	$('.change #rank').val(res.user_id.rank);

	                	/* 物品发布板块刷新数据 */
	                	var thing_len = res.things.length;
	                	if(thing_len > 0){
	                		$('.things-fabu .message h4').removeClass("hide");
	                		for( var h = 0 ; h < thing_len ; h++){
	                			$('.things-fabu .message ul').append('<li class="clearfix" id='+ res.things[h].things_id +'><a href="#" class="no-wrap fl">'+ res.things[h].title +'</a><p class="de fl">删除该条发布信息</p></li>');	                		
	                		}
	                		console.log("刷新物品发布信息列表....");
	                	}else{
	                		$('.things-fabu .no-fabu').removeClass("hide");
	                	}

	                	$('#modal-alert99').on('click','.iziModal-button-close',function(){
						//UnMaskIt($('.mask'));
						window.location.reload(); 
					});
	                	$('.things-fabu .message ul').on('click','li .de',function(){
	                		var things_id = $(this).parent().attr('id');    
	                		var re = confirm("其他用户即将不会浏览到这条发布信息，确定要删除吗？")
	                		if (re == true){   
	                			var del_thingsid = {
	                				user_id : $('.welcome-lump .phone').html(),
	                				mes_id: things_id
	                			}   

	                			$.ajax({  
	                				type: "post",  
									// 老麦提供接口
									url: "data/password.json",  
									dataType: "json",
									data: JSON.stringify(del_thingsid), //每次加载最后一条的索引值
									success: function (res) {  
										if(res.flag){
											$('#modal-alert99').iziModal('open');
										}else{
											alert("删除异常！请重试")
										}
									},
									error:function(XMLHttpRequest, textStatus, errorThrown){  
										console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
										console.log("错误类型textStatus: " + textStatus);  
										console.log("异常对象errorThrown: " + errorThrown);  
										alert("删除失败！请重试")
									}  
								});          			 
	                		}
	                		
	                	});

	                	/* Plus帖子板块刷新数据 */
	                	var plus_len = res.plus.length;
	                	if(plus_len > 0){
	                		$('.plus-fabu .message h4').removeClass("hide");
	                		for( var h = 0 ; h < plus_len ; h++){
	                			$('.plus-fabu .message ul').append('<li class="clearfix" id='+ res.plus[h].things_id +'><a href="#" class="no-wrap fl">'+ res.plus[h].title +'</a><p class="de fl">删除该条发布信息</p></li>');	                		
	                		}
	                		console.log("刷新Plus列表....");
	                	}else{
	                		$('.plus-fabu .no-fabu').removeClass("hide");
	                	}

	                	$('#modal-alert99').on('click','.iziModal-button-close',function(){
						//UnMaskIt($('.mask'));
						window.location.reload(); 

					});
	                	$('#modal-alert98').on('click','.iziModal-button-close',function(){
						//UnMaskIt($('.mask'));
						window.location.reload(); 
						
					});
	                	$('.plus-fabu .message ul').on('click','li .de',function(){
	                		var plus_id = $(this).parent().attr('id');    
	                		var re = confirm("其他用户即将不会浏览到这条Plus，确定要删除吗？")
	                		if (re == true){   
	                			var del_plusid = {
	                				user_id : $('.welcome-lump .phone').html(),
	                				mes_id: plus_id
	                			}   

	                			$.ajax({  
	                				type: "post",  
									// 老麦提供接口
									url: "data/password.json",  
									dataType: "json",
									data: JSON.stringify(del_plusid), //每次加载最后一条的索引值
									success: function (res) {  
										if(res.flag){
											$('#modal-alert99').iziModal('open');
										}else{
											alert("删除异常！请重试")
										}
									},
									error:function(XMLHttpRequest, textStatus, errorThrown){  
										console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
										console.log("错误类型textStatus: " + textStatus);  
										console.log("异常对象errorThrown: " + errorThrown);  
										alert("删除失败！请重试")
									}  
								});          			 
	                		}
	                		
	                	});

	                	/* 好友管理模块删除好友逻辑 */
	                	var friends_len = res.friend.length;
	                	if(friends_len > 0){
	                		for( var h = 0 ; h < friends_len ; h++){
	                			/* 用户若无填写昵称、则显示“ 用户+ 注册手机号码 ” */
	                			if( res.friend[h].friend_name == ""){
	                				$('.friend-manage .friend-list').append('<li id='+ res.friend[h].friend_id+'><img><div class="mes"><p>用户'+ res.friend[h].friend_phone+'</p></div><div class="del-friend">删除好友</div></li>');
	                			}else{
	                				$('.friend-manage .friend-list').append('<li id='+ res.friend[h].friend_id+'><img><div class="mes"><p>'+ res.friend[h].friend_name+'</p></div><div class="del-friend">删除好友</div></li>');
	                			}
	                			$('.friend-list li').eq(h).find("img").attr('src', res.friend[h].friend_img);
	                		}
	                		console.log("刷新好友列表....");
	                	}else{
	                		$('.friend-manage .no-friend').removeClass("hide");
	                	}

	                	$('.friend-manage .friend-list').on('click','li .del-friend',function(){
	                		var curfriend_id = $(this).parent().attr('id');    
	                		var ren = confirm("删除之后你将看不到之前与Ta的聊天记录，确定要删除吗？")
	                		if (ren == true){   
	                			var del_friendsid = {
	                				user_id : $('.welcome-lump .phone').html(),
	                				mes_id: curfriend_id
	                			}   

	                			$.ajax({  
	                				type: "post",  
									// 老麦提供接口
									url: "data/password.json",  
									dataType: "json",
									data: JSON.stringify(del_friendsid), //每次加载最后一条的索引值
									success: function (res) {  
										if(res.flag){
											$('#modal-alert98').iziModal('open');
										}else{
											alert("删除异常！请重试")
										}
									},
									error:function(XMLHttpRequest, textStatus, errorThrown){  
										console.log("请求对象XMLHttpRequest: " + XMLHttpRequest);  
										console.log("错误类型textStatus: " + textStatus);  
										console.log("异常对象errorThrown: " + errorThrown);  
										alert("删除失败！请重试")
									}  
								});          			 
	                		}
	                	});

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


/* 图片上传插件 */
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
    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
    	$img = $('.img-preview');
    	$img.parent().attr('id',file.id)
    	$img.siblings(".result").remove();
    // $list为容器jQuery实例
   	// $list.append( $li );

    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader.makeThumb( file, function( error, src ) {
    	if ( error ) {
    		$img.replaceWith('<span>不能预览</span>');
    		return;
    	}

    	$img.attr( 'src', src );
    }, 120, 120 );
});
    uploader.on( 'uploadProgress', function( file, percentage ) {	
    	var $li_p = $( '#'+file.id );
    	$percent = $li_p.find('.progress span');
		//$('.cur-progress').addClass('restart');
    // 避免重复创建
    if ( !$percent.length ) {
    	$percent = $('<p class="progress"><span></span></p>')
    	.appendTo( $li_p)
    	.find('span');
    }
    $percent.css('width',percentage * 100 +'%');
    // $('.cur-progress').animate( 'width', percentage * 100 + '%' );
    // $('.cur-progress').animate({width: percentage * 100+'%'},2000);
})
    uploader.on('startUpload',function( file ){

    });
	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on( 'uploadSuccess', function( file ) {
		// $( '#'+file.id ).addClass('upload-state-done');
		console.log("上传成功");
		var $li = $( '#'+file.id ),
		$result = $li.find('div.result');

	    // 避免重复创建
	    if ( !$result.length ) {
	    	$result = $('<div class="result tc tip"></div>').appendTo( $li );
	    }

	    setTimeout(function(){
	    	$result.removeClass("fail");
	    	$result.addClass("success");

	    	$result.text('上传成功');
	    },2000)

	});

	// 文件上传失败，显示上传出错。
	uploader.on( 'uploadError', function( file ) {

		var $li = $( '#'+file.id ),
		$result = $li.find('div.result');

	    // 避免重复创建
	    if ( !$result.length ) {
	    	$result = $('<div class="result tc"></div>').appendTo( $li );
	    }

	    setTimeout(function(){
	    	$result.removeClass("success");
	    	$result.addClass("fail");
	    	$result.text('上传失败');
	    },2000)


	});
	// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on( 'uploadComplete', function( file ) {
		// $( '#'+file.id ).find('.progress').remove();	
		//$img.removeClass(file.id);
		setTimeout(function(){
			$( '#'+file.id ).find('.progress').remove();
		},2000)	
		 //alert("sjb");
		});

	/* 当前选中输入框状态添加 */
	$('.edit-content').on('click','.ipt',function(){
		$('.ipt').removeClass("cur");
		$(this).addClass("cur");
	});

// $('.secrecy').change(function(){

// });

/* 更改用户密码 后台校验密码是否为当前用户密码 */
$('.edit-content .origin').blur(function(){
	var origin_pw = $(this).val();
	var origin_spw ={
		password: $('.edit-content .origin').val(),
		phone: $('.welcome-lump .phone').html()
	}
	var $_this = $(this);
	$.ajax({  
		type: "get",  
		url: "data/password.json",  
		dataType: "json",
		data: JSON.stringify(origin_spw),  
		success: function (res) {  
			if(res.flag){
				console.log("输入密码为当前用户账户密码....");
				$_this.siblings(".res").removeClass("fail").addClass("success").html("密码验证成功");
				$_this.removeClass("fail");
				$_this.addClass("success");
			}else{
				$_this.siblings(".res").removeClass("success").addClass("fail").html("密码验证失败");
				$_this.addClass("fail");
				$_this.removeClass("success");
			}
		}
	});
});

$('.edit-content .now').blur(function(){
	if($(this).val() == 0){
		return;
	}
	$(this).addClass("success");

}).click(function(){
	$(this).removeClass("fail");
	$(this).removeClass("success");
});

$('.edit-content .confirm').blur(function(){
	if($(this).val() == 0){
		return;
	}
	if($(this).val() != $('.edit-content .now').val()){
		$(this).removeClass("success");
		$(this).addClass("fail");
		$(this).siblings(".tips").html("两次密码输入不一致,请重新输入。")
		$(this).siblings(".res").html("");
	}
	else{
		$(this).removeClass("fail");
		$(this).addClass("success");
		$(this).siblings(".tips").html("");
		$(this).siblings(".res").html("密码确认成功");

	}
}).click(function(){
	$(this).removeClass("fail");
	$(this).removeClass("success");
});

/* 编辑用户资料 */

$("#modal-alert").iziModal({
	title: "信息已更新。",
	iconClass: 'icon-check',
	headerColor: '#8ec5fc',
	overlayClose: false,
	width: 400
});

$("#modal-alert1").iziModal({
	title: "更改密码成功！",
	iconClass: 'icon-check',
	headerColor: '#8ec5fc',
	overlayClose: false,
	width: 400
});

$("#modal-alert2").iziModal({
	title: "请检查是否有错误消息提醒,重新输入",
	iconClass: 'icon-check',
	headerColor: '#ff6600',
	overlayClose: false,
	width: 400
});

$("#modal-alert99").iziModal({
	title: "删除信息成功！",
	iconClass: 'icon-check',
	headerColor: '#ff0000',
	overlayClose: false,
	width: 400
});

$("#modal-alert98").iziModal({
	title: "删除好友成功！（同时聊天记录也会被删除）",
	iconClass: 'icon-check',
	headerColor: '#f5576c',
	overlayClose: false,
	width: 400
});

$('.change-message').click(function(){
	var user_mes = {
		phone: $('.welcome-lump .phone').html(),
		name: $('.edit-content #name').val(),
		sex: $('.edit-content #sex').val(),
		year: $('.edit-content #year').val(),
		school: $('.edit-content #school').val(),
		major: $('.edit-content #major').val(),
		loc: $('.edit-content #loc').val(),
	};
	/* 用户未填写的部分 直接用 保密 取代*/
	var user_sdata = JSON.stringify(user_mes);
	$.ajax({  
		type: "post",  
		url: "data/password.json",  
		dataType: "json",
		data: user_sdata,  
		success: function (res) {  
			if(res.flag){
				console.log("更改信息成功....");
				$('#modal-alert').iziModal('open');
				$('#modal-alert').on('click','.iziModal-button-close',function(){
				//UnMaskIt($('.mask'));
				window.location.reload();
			});
			}
		}
	});
});
/* 更改密码 */
$('.change-pw').click(function(){
	var user_pw = {
		phone: $('.welcome-lump .phone').html(),
		origin: $('.change-password .origin').val(),
		now: $('.change-password .now').val(),
		confirm: $('.change-password .confirm').val(),
	};
	/* 用户未填写的部分 直接用 保密 取代*/
	if(($('.change-password .origin').hasClass("success")) && ($('.change-password .now').hasClass("success")) && ($('.change-password .confirm').hasClass("success"))){
		$.ajax({  
			type: "post",  
			url: "data/password.json",  
			dataType: "json",
			data: JSON.stringify(user_pw),  
			success: function (res) {  
				if(res.flag){
					console.log("更改密码成功....");
					$('#modal-alert1').iziModal('open');
					$('#modal-alert1').on('click','.iziModal-button-close',function(){
					//UnMaskIt($('.mask'));
					window.location.reload();
				});
				}
			}
		});
	}else{
		console.log("请检查是否有错误消息提示,重新输入....");
		$('#modal-alert2').iziModal('open');
	}
});

$('.left-list').on('click','li',function(){
	var now_index = $(this).index();
	$(this).addClass("cur").siblings("li").removeClass("cur");
	$('.list-content .item').eq(now_index).removeClass("hide").siblings().addClass("hide");
});


        // 基于准备好的dom，初始化echarts实例

        /*  围诚社区男女用户比例 */
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
        	color : [
        	'#2ea7e0','#ff6600'
        	],
        	title : {
        		text: '围诚社区高校学生用户男女比例',
        		subtext: '数据上传者：麦贺良  最近更新时间：2017-10-18 14:35:23',
        		x:'center'
        	},
        	tooltip : {
        		trigger: 'item',
        		formatter: "{a} <br/>{b} : {c} ({d}%)"
        	},
        	legend: {
        		orient: 'vertical',
        		left: 'left',
        		data: ['男生','女生']
        	},
        	series : [
        	{
        		name: '访问来源',
        		type: 'pie',
        		radius : '55%',
        		center: ['50%', '60%'],
        		data:[
        		{value:40, name:'男生'},
        		{value:60, name:'女生'}	
        		],
        		itemStyle: {
        			emphasis: {
        				shadowBlur: 10,
        				shadowOffsetX: 0,
        				shadowColor: 'rgba(0, 0, 0, 0.5)'
        			}
        		}
        	}
        	]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        /* 围诚社区近期注册用户统计 */
        var myChart1 = echarts.init(document.getElementById('main1'));

        data = [["2017-9-05",116],["2017-9-06",129],["2017-9-07",135],["2017-9-08",86],["2017-9-09",73],["2017-9-10",85],["2017-9-11",73],["2017-9-12",68],["2017-9-13",92],["2017-9-14",130],["2017-9-15",245],["2017-9-16",139],["2017-9-17",115],["2017-9-18",111],["2017-9-19",309],["2017-9-20",206],["2017-9-21",137],["2017-9-22",128],["2017-9-23",85],["2017-9-24",94],["2017-9-25",71],["2017-9-26",106],["2017-9-27",84],["2017-9-28",93],["2017-9-29",85],["2017-9-30",73],["2017-10-01",83],["2017-10-02",125],["2017-10-03",107],["2017-10-04",82],["2017-10-05",44],["2017-10-06",72],["2017-10-07",106],["2017-10-08",107],["2017-10-010",66],["2017-10-10",101],["2017-10-11",102],["2017-10-12",113],["2017-10-13",107],["2017-10-14",131],["2017-10-15",111],["2017-10-16",64],["2017-10-17",610],["2017-10-18",88],["2017-10-110",77],["2017-10-20",83],["2017-10-21",111],["2017-10-22",57],["2017-10-23",55],["2017-10-24",60]];

        /* 分割数组 */
        var dateList = data.map(function (item) {
        	return item[0];
        });
        var valueList = data.map(function (item) {
        	return item[1];
        });
        var  option1 = {
	    // Make gradient line here
	    visualMap: {
	    	show: false,
	    	type: 'continuous',
	    	seriesIndex: 0,
	    	min: 0,
	    	max: 600
	    },

	    title: {
	    	left: 'center',
	    	text: '围诚社区近期注册用户统计',
	    	subtext: '数据上传者：麦贺良  最近更新时间：2017-10-30 17:23:21'
	    },
	    tooltip: {
	    	trigger: 'axis'
	    },
	    xAxis: {
	    	data: dateList
	    },
	    yAxis: {
	    	splitLine: {show: false}
	    },
	    grid: {
	    	bottom: '10%'
	    }, 
	    series: {
	    	type: 'line',
	    	showSymbol: false,
	    	data: valueList
	    }
	};

	myChart1.setOption(option1);

});



