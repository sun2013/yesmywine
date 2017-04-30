$(function() {
	$.get("../css/header.template?callback=?", function(data) {
		$(".header").html(data);
		$(".nav").css({
			background: "#7e0001"
		})
		$(".menu").css({
			background: "#4a3931"
		});
		$(".ul_2").css({
			background: "#624b40"
		});
		$(".menu_1").find("a").css({
			color: "#b8a199"
		});
		$(".ul1").css({
			background: "#624b40",
		});
		$("#zhanghu").hover(function() {
			$("#dingdan").show().find("li").css({
				float: "none"
			}).hover(function() {
				$(this).css({
					background: "#a11011"
				}).siblings().css({
					background: "#fff"
				})
			});
		}, function() {
			$("#dingdan").hide();
			//						$(".menu_1").hide();
		});
		$(".ul1").hover(function() {
			$(this).css({
				background: "#624b40"
			}).find(".menu_2").stop().show().animate({
				left: 200,
				opacity: 0.9
			}).end().siblings().find(".menu_2").css({
				left: 0,
				opacity: 0
			}).hide();
		})
		$(".menu").hover(function() {
			$(".menu_1").show();
		}, function() {
			$(".menu_1").hide().find(".menu_2").hide();
		})
		$.cookie.json = true;
		var users = $.cookie("users");
//		console.log(users)
		if(users) {
			if(users.username) {
				username = users.username;
				$("#users").html("<a href = 'javascript:void(0)'>您好" + username + "</a><a class ='tuichu' href = 'javascript:void(0)'>退出</a>");
				$(".tuichu").on("click", function() {
					$.cookie("users", "");
					$("#users").html("<a href='html/logo.html' style='float: left;border-right: 1px solid;padding-right: 11px;color:#85726c ;'>登陆</a><a href='html/register.html' style='float: left;margin-left: 9px;color: #85726c;'>注册</a>")
				})
			}
			//				console.log(users)
			if(users.products) {
				//							console.log(users.products.length)
				$(".cart_count").html(users.products.length)
			};
		};
	});
	/*********************scroll********************/
	var $lis = $(".scroll_window li"),
		len = $lis.length,
		liWidth = $lis.eq(0).outerWidth(),
		scroll_timer = null,
		scroll_index = 2;
	$last = $lis.eq(len - 1).clone(true)
	$('.scroll_window ul').prepend($last);
	$lis.eq(0).clone(true).appendTo(".scroll_window ul");
	len += 2;
	for(var i = 0; i < len - 2; i++) {
		var _div = $("<div></div>").appendTo("#scroll_pages");
		_div.find("img").css({
			width: 50,
			height: 50
		});
	}
	/*$lis.eq(len-1).clone(true).prependTo(".scroll_window ul");
	$lis.eq(0).clone(true).appendTo(".scroll_window ul");*/
	//设置容器的宽度
	$('.scroll_window ul').innerWidth(len * liWidth);
	//				console.log($lis.eq(0).width())
	$('.scroll_window ul').css({
		left: -liWidth
	});
	//对第一个图框添加装饰并对所有小图绑定click事件
	$('#scroll_pages div').eq(0).addClass("curr").end().on("mouseenter", function() {
		/*if($(".scroll_window ul").is(":animated")){
			return;
		}*/
		scroll_index = $(this).index() + 1;
		//						console.log($('#scroll_pages div').eq(0))
		scroll();
	});
	$(".xia").on("click", function() {
		//当动画还在执行时，按钮失效
		if($(".scroll_window ul").is(":animated")) {
			return;
		}
		scroll();
	})
	$(".shang").on("click", function() {
		if($(".scroll_window ul").is(":animated")) {
			return;
		}
		scroll_index -= 2;
		scroll();
	})

	function scroll() {
		var _left = -1 * scroll_index * liWidth;
		//当前小图片索引
		var circleIndex = scroll_index > len - 2 ? 0 : scroll_index - 1;
		$("#scroll_pages div").eq(circleIndex).addClass('curr').siblings().removeClass()
		scroll_index++;
		$('.scroll_window ul').stop().animate({
			left: _left
		}, function() {
			if(scroll_index >= len) {
				$(".scroll_window ul").css("left", -liWidth);
				scroll_index = 2;
			}
			if(scroll_index == 1) {
				$(".scroll_window ul").css("left", -liWidth * (len - 2));
				scroll_index = len - 1;
			}
		});

	}
	$(".scroll_window").hover(function() {
		clearInterval(scroll_timer);
	}, function() {
		scroll_timer = setInterval(scroll, 3000);
	}).trigger("mouseleave");
	var products_index = 0;
	var products_html = "";
	var isLoading = false;
	_ajax();
	$(window).on("scroll", function(e) {
		products_html = "";
		var prTop = $(".products_main").offset().top + $(".products_main").height() - 800;
		//					console.log("in....")
		if(products_index > 24) {
			//						console.log(products_index)
			return;
		}
		if(!isLoading && prTop < $(this).scrollTop()) {
			isLoading = true;
			_ajax();
		}
		$(".products_time").hover(function() {
			$(this).stop().animate({
				right: 0
			})
		}, function() {
			$(this).stop().animate({
				right: -165
			})
		});
		var hour = 0,
			minutes = 0,
			d = 0,
			n = 0
		second = 0;
		setInterval(function() {
			d = new Date("2016/11/20 00:00:00")
			n = new Date()
			n = d - n;
			day = Math.floor(n / 1000 / 60 / 60 / 24);
			hour = Math.floor(n / 1000 / 60 / 60 % 24);
			minutes = Math.floor(n / 1000 / 60 % 60);
			second = Math.floor(n / 1000 % 60);
			$(".product_day").html(day);
			$(".product_hour").html(hour);
			$(".product_minute").html(minutes);
			$(".product_second").html(second);
		}, 1000);
		$(".product_img").on("click", function() {
			window.location = "product_info.html";
		});
		$(".product_img").on("click", function() {
			var product = {};
			product.src = $(this).find("img").attr('src');
			product.price = $(this).siblings(".prod_price").find("strong").text();
			product.name = $(this).siblings(".prod_info").find(".pr_name").text();
			product.zhekou = $(this).siblings(".prod_price").find("em").text();
			product.amount = $(this).siblings(".product_com").find(".product_fir").find("strong").text();
			console.log(product.amount)
			$.cookie.json = true;
			$.cookie("product", product);
			//								console.log($.cookie("products_src"))
		})
		$(".products_qg").on("click", function() {
			window.location = "product_info.html";
		});
		$(".products_qg").on("click", function() {
			var product = {};
			product.src = $(this).parent().siblings(".product_img").find("img").attr('src');
			product.price = $(this).parent().siblings(".prod_price").find("strong").text();
			product.name = $(this).parent().siblings(".prod_info").find(".pr_name").text();
			product.zhekou = $(this).parent().siblings(".prod_price").find("em").text();
			product.amount = $(this).parent().siblings(".product_com").find(".product_fir").find("strong").text();
			console.log(product.amount)
			$.cookie.json = true;
			$.cookie("product", product);
			//								console.log($.cookie("products_src"))
		});
	});
	$(".foot").load("../css/footer.template");

	function _ajax() {
		$.when($.ajax("../css/products_demo.template"), $.ajax("../js/products.json")).done(function(template, data) {
			$(".products_qg1").off("click")
			var template = template[0],
				data = data[0];
			//			products_len = data.length;
			products_index += 6;
			for(var i = 0; i < 6; i++) {
				products_html += template.replace("商品名称", data[i + products_index].name)
					.replace("英文名", data[i + products_index].english)
					.replace("商品折扣", data[i + products_index].zhekou)
					.replace("商品出售", data[i + products_index].after)
					.replace("商品评论", data[i + products_index].common)
					.replace("商品路径", data[i + products_index].img)
					.replace("商品好评率", data[i + products_index].amount)
					.replace("商品价格", data[i + products_index].price);

			}
			isLoading = false;
			$(".products_main").append(products_html);
			$(".products_qg1").on("click", function() {
				var _name = $(this).parent().siblings(".prod_info").find(".pr_name").text(),
					_img = $(this).parent().siblings(".product_img").find("img").attr('src'),
					_price = $(this).parent().siblings(".prod_price").find("strong").text(),
					product = {
						name: _name,
						img: _img,
						price: _price,
						amount: 1
					};
				var img = $(this).parent().siblings(".product_img").find('img');
				var flyElm = img.clone().css('opacity', 0.75);
				$('body').append(flyElm);
				flyElm.css({
					'z-index': 9000,
					'display': 'block',
					'position': 'absolute',
					'top': img.offset().top + 'px',
					'left': img.offset().left + 'px',
					'width': img.width() + 'px',
					'height': img.height() + 'px'
				});
				flyElm.animate({
					top: $('.head_shopcart').offset().top,
					left: $('.head_shopcart').offset().left,
					width: 20,
					height: 32
				}, 'slow', function() {
					flyElm.remove();
				});
				//								console.log(_name)
				$.cookie.json = true;
				users = $.cookie("users");
				if(!users) {
					//									console.log("in")
					users = {};
				}
				if(!users.products)
					users.products = [];
//				console.log(users)
				pro_e = exist(_name, users.products); //-1不存在
				if(pro_e !== -1) {
					users.products[pro_e].amount++;
				} else {
//					console.log(users.products)
					users.products.push(product);
				}
				$.cookie("users", users, {
					expires: 7,
					path: "/"
				});
				//							console.log($.cookie("users"))
			})

			function exist(value, elements) {
				var idx = -1;
				$.each(elements, function(index, element) {
					if(element.name === value)
						idx = index;
					return;
				});
				//								console.log(elements)
				return idx;
			}
		});
	}
	$(".head_shopcart").on("click", function() {
			window.location = "cart.html";
		})
		//				console.log($.cookie("users"))
})