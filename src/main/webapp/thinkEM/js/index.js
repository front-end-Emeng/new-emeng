$(document).ready(function(){
	// 登录按钮和注册按钮的切换
	$(function(){
		$("#nav-header .login_btn .login").hover(function(){
			$(this).removeClass("btn-default").addClass("btn-danger");
			$("#nav-header .login_btn .regis").removeClass("btn-danger").addClass("btn-default");
		});
		$("#nav-header .login_btn .regis").hover(function(){
			$(this).removeClass("btn-default").addClass("btn-danger");
			$("#nav-header .login_btn .login").removeClass("btn-danger").addClass("btn-default");
		});
	})

	// 轮播效果的实现
	var t = n = 0;
	count = $("#playShow > a").length;	
	$(function(){
		$("#playShow a:not(:first-child)").hide();
		$("#playText").html($("#playShow a:first-child").find("img").attr('alt'));
		$("#playNum a:first").css({"background":"#e8413e",'color':'#A8471C'});
		// $("#playText").click(function(){window.open($("#playShow a:first-child").attr('href'), "_blank")});
		$("#playNum a").click(function() {
		   var i = $(this).text() - 1;
		   n = i;
		   if (i >= count) return;
		   $("#playText").html($("#playShow a").eq(i).find("img").attr('alt'));
		   // $("#playText").unbind().click(function(){window.open($("#playShow a").eq(i).attr('href'), "_blank")})
		   $("#playShow a").filter(":visible").hide().parent().children().eq(i).fadeIn(1200);
		   $(this).css({"background":"#e8413e",'color':'#A8471C'}).siblings().css({"background":"#D7D6D7",'color':'#000'});
	});
	t = setInterval("showAuto()", 5000);
	$("#play").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 5000);});
	})

	// 我有话说部分tab标签的切换
	$(function(){
		$(".second-title .tab-one").click(function(){
			$(".tab-two").removeClass("active");
			$(this).addClass("active");
			$(".common-content .content-two").hide();
			$(".common-content .content-one").show();
		});
		$(".second-title .tab-two").click(function(){
			$(".tab-one").removeClass("active");
			$(this).addClass("active");
			$(".common-content .content-one").hide();
			$(".common-content .content-two").show();
		});
	});

	// 盟员广场部分tab标签的切换
	$(function(){
		var tabNum = $(".friend .second-title ul li span.tab").length;
		$(".friend .second-title ul li span.tab").hover(function(){
			$(".friend .second-title ul li span.tab").removeClass("active");
			$(this).addClass("active");
			i = $(this).parent().index();
			$(".friend .common-content ul").eq(i).siblings("ul").hide();
			$(".friend .common-content ul").eq(i).show();
		});

		$(".friend .common-content .right").click(function(){
			n = $(".friend .second-title ul li span.active").parent().parent().index();
			if(n>=tabNum-1){
				n = 0;
			}else{
				n++;
			}
			$(".friend .second-title ul li span.tab").removeClass("active");
			$(".friend .second-title ul li span.tab").eq(n).addClass("active");
			$(".friend .common-content ul").eq(n).siblings("ul").hide();
			$(".friend .common-content ul").eq(n).show();
		});
		$(".friend .common-content .left").click(function(){
			n = $(".friend .second-title ul li span.active").parent().index();
			if(n<0){
				n = tabNum-1;
			}else{
				n--;
			}
			$(".friend .second-title ul li span.tab").removeClass("active");
			$(".friend .second-title ul li span.tab").eq(n).addClass("active");
			$(".friend .common-content ul").eq(n).siblings("ul").hide();
			$(".friend .common-content ul").eq(n).show();
		});
	});

	// 手机移动端适配的时候
	if (window.screen.width<500) {
		// 导航栏更多和收起效果
		$(function(){
			$("#nav_title ul li.more").nextAll().hide();
			$("#nav_title ul li.more").click(function(){
				$(this).nextAll().fadeIn();
				$(this).hide();
			});
			$("#nav_title ul li.up").click(function(){
				$("#nav_title ul li.more").show();
				$("#nav_title ul li.more").nextAll().hide();
				$("#nav_title ul li.more").nextAll.fadeOut();
			})
		});

		// 二级导航栏更多和收起效果
		$(function(){
			$("#nav_content  div.more").nextAll().hide();
			$("#nav_content  div.more").click(function(){
				$(this).nextAll().fadeIn();
				$(this).hide();
			});

			$("#nav_content div.up").click(function(){
				$("#nav_content  div.more").show();
				$("#nav_content  div.more").nextAll().fadeOut();
			})
		});
	}
});

	function showAuto()
	{
		n = n >= (count - 1) ? 0 : ++n;
		$("#playNum a").eq(n).trigger('click');
	};