$(function() {
	/*****************************header*********************************/
	$.ajax("css/header.template").done(function(data) {
			$(".header").html(data);
			//头部下拉列表
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
			//二级菜单
			$(".ul1").hover(function() {
				$(this).find(".menu_2").stop().show().animate({
					left: 200,
					opacity: 0.9
				}).end().siblings().find(".menu_2").css({
					left: 0,
					opacity: 0
				}).hide();
			});
			//历史搜索记录
			$(".logo_txt").on("focus", function() {
				$(this).html("");
				var str = $("<p>成都发生惨烈车祸</p><p>贺小洋与隔壁老王的经典爱情故事</p><p>贺小洋出轨门事件</p><p>贺小洋与他的绯闻前男友</p>");
				$(".search_cont").html(str).show();
				$(".search_cont p").on("click", function() {
					$(".logo_txt").val($(this).text());
				})
			});
			$(".logo_txt").on("blur", function() {
				setTimeout(function() {
					$(".search_cont").hide();
				}, 200)
			});
			//模糊搜索实现粗略提示
			$(".logo_txt").on("keydown", function() {
				$.ajax({
					type: "get",
					url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
					dataType: "jsonp",
					data: {
						wd: $(".logo_txt").val(),
						json: 1,
						p: 3
					},
					jsonp: "cb",
					async: true,
					success: function(data) {
						var data = data.s;
						var _html = "";
						$.each(data, function(index, ele) {
							//								console.log(ele)
							_html += "<p>" + ele + "</p>"
						});
						//							console.log(_html)
						$(".search_cont").html(_html);
						$(".search_cont p").on("click", function() {
							$(".logo_txt").val($(this).text());
						})
					}
				});
			});
			$(".menu").hover(function() {
				$(".menu_1").show();
			}, function() {
				$(".menu_1").hide().find(".menu_2").hide();
			});
//			console.log("in")
			//当前是否用户登录过
			$.cookie.json = true;
			var users = $.cookie("users");
//			console.log(users)
			if(users) {
				if(users.username) {
					username = users.username;
					$("#users").html("<a href = 'javascript:void(0)'>您好" + username + "</a><a class ='tuichu' href = 'javascript:void(0)'>退出</a>");
					$(".tuichu").on("click", function() {
						$.cookie("users", null);
						$("#users").html("<a href='html/logo.html' style='float: left;border-right: 1px solid;padding-right: 11px;color:#85726c ;'>登陆</a><a href='html/register.html' style='float: left;margin-left: 9px;color: #85726c;'>注册</a>")
					})
				}
				//				console.log(users)
				if(users.products) {
					//							console.log(users.products.length)
					$(".cart_count").html(users.products.length)
				};
			};
			//判断是否有商品信息
			$(".cart_a").hover(function() {
				if(!users || !users.products || !users.products.length) {
					$(".cart_list").stop().slideDown()
				} else {
					_html = "";
					for(var attr in users.products) {
						_html += "<div style = 'width:320px' class = 'clear'><img style = 'width:60px;height:98px;float;left' src= " + users.products[attr].img.slice(3) + "><div class = 'fr'><p >" + users.products[attr].name + "</p><p >数量：" + users.products[attr].amount + "</p></div></div>"
					}
					$(".cart_list1").html(_html).stop().slideDown();
				}
			}, function() {
				$(".cart_list").stop().slideUp();
				$(".cart_list1").stop().slideUp();
			})
		})
		/*******************************banner轮播*******************************************/
	$(".banner img").eq(0).on("load", function() {
		var _margin_left = ($(".banner").find("img").eq(0).width() - $(window).width()) / 2;
		$(".banner ul").css({
			marginLeft: -_margin_left
		});
	})
	var imgIndex = 1,
		currIndex = 0,
		position = [],
		timer = null,
		_html = "",
		len = $("._banner").children("li").length;
	for(var i = 0; i < len; i++) {
		_html += "<div>" + (i + 1) + "</div>";
	}
	$('.circle').append($(_html)).children("div").css({
		color: "#fff",
		borderColor: "#000",
		fontWeight: "bold"
	}).eq(0).addClass("curr");
	$(".circle").children("div").on("mouseenter", function() {
			//						clearInterval(timer);
			imgIndex = $(this).index();
			/*if($("._banner li").is(":animated")) {
				//						console.log("1")
				return;
			}*/
			if($(this).index() === currIndex) {
				return;
			}
			go();
		})
		//				console.log($('.circle').append($(_html)).children("div"))
	$(".banner").hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(go, 3000);
	}).trigger("mouseleave");
	/********************************** 预付定金******************************************/
	$(".yuding_jian").on("click", function() {
		$(this).hide();
		$(".yuding_img").hide();
		$(".yuding_jia").show();
	})
	$(".yuding_jia").on("click", function() {
		$(this).hide();
		$(".yuding_jian").show();
		$(".yuding_img").show();
	})
	$(".box_2").hover(function() {
		$(this).css({
			background: "#fff",
			border: 0
		}).siblings().show().parent().siblings(".yuding_box").children(".box_2").css({
			background: "#e0dbd8",
			borderTop: "1px solid #bfb7aa",
			borderBottom: "1px solid #bfb7aa"
		}).siblings().hide();
	}).eq(0).trigger("mouseenter").siblings().show();

	/******************************************人气轮播图***************************************/
	$.when($.ajax("js/renqi.json"), $.ajax("css/renqi.template")).done(function(data, template) {
		//					console.log(template)
		var _html = "",
			data = data[0],
			template = template[0],
			len = data.length;
		//						console.log(template)
		for(var i = 0; i < len; i++) {
			_html += template.replace("商品名称", data[i].name)
				.replace("商品价格", data[i].price)
				.replace("图片路径", data[i].img)
				.replace("商品访问量", data[i].amount)
				//						console.log(template)
		}
		$(".rengqi_go_1").html(_html);

	});
	$(".rengqi_title li").on("mouseenter", function() {
			var index = $(this).index();
			//					console.log(index)
			$(this).css({
				background: "#d3161b",
				color: "#fff"
			}).siblings().css({
				background: "#ffe8e8",
				color: "#73584a"
			});
			$('.rengqi_go_1').stop().animate({
				top: -index * $('.rengqi_go_1').find("dl").outerHeight()
			})
		})
		/**************************猜你喜欢**************************************/
	var _html = "",
		page = 0;
	gusee_Change();
	$(".body_a").on("click", function() {
			_html = "";
			gusee_Change();
			page += 6;
			if(page >= 24)
				page = 0;
		})
		/*******************************之前买过的轮播******************************************/
	var before_index = 1,
		before_len = $(".buy_before_left_active").length,
		_html2 = "";
	timer1 = null;
	$(".buy_before_left_window").hover(function() {
		clearInterval(timer1)
	}, function() {
		timer1 = setInterval(before_go, 2000)
	}).trigger("mouseleave");
	for(var i = 0; i < before_len; i++) {
		_html2 += "<div style = 'height:20px;width:20px;border-radius:50%;background:#c9c9c9;float:left;margin-left:3px'></div>"
	}
	$(".buy_before_circle").html(_html2).children("div").eq(0).css({
			background: "#cd0005"
		}).end().stop().hover(function() {
			before_index = $(this).index();
			before_go();
		})
		/*******************************手风琴******************************************/
		/*$(".pinpai_1").find("li").hover(function() {
				if($(".pinpai_1").find("li").is(":animated")) {
					return;
				}
				var len = $(this).nextAll().length;
				var position = [];
				for(var i = 0; i < len; i++) {
					position[i] = parseInt($(this).nextAll().eq(i).css('left'));
					$(this).nextAll().eq(i).stop().animate({
						left: position[i] + 300
					})
				}
			}, function() {
				var len = $(this).nextAll().length;
				if($(".pinpai_1").find("li").is(":animated")) {
					return;
				}
				var position = [];
				for(var i = 0; i < len; i++) {
					position[i] = parseInt($(this).nextAll().eq(i).css('left'));
					$(this).nextAll().eq(i).stop().animate({
						left: position[i] - 300
					})
				}
			})*/
	$(".pinpai_1 .pinpai_2_content li.first").mouseenter(function() {
		$(".pinpai_2_content li.second").stop().animate({
			"left": 450
		}, 500);
		$(".pinpai_2_content li.third").stop().animate({
			"left": 600
		}, 500);
		$(".pinpai_2_content li.forth").stop().animate({
			"left": 750
		}, 500);
		$(".pinpai_2_content li.fifth").stop().animate({
			"left": 900
		}, 500);
		$(".pinpai_2_content li.sixth").stop().animate({
			"left": 1050
		}, 500);
	});
	$(".pinpai_1 .pinpai_2_content li.second").mouseenter(function() {
		$(".pinpai_2_content li.second").stop().animate({
			"left": 150
		}, 500);
		$(".pinpai_2_content li.third").stop().animate({
			"left": 600
		}, 500);
		$(".pinpai_2_content li.forth").stop().animate({
			"left": 750
		}, 500);
		$(".pinpai_2_content li.fifth").stop().animate({
			"left": 900
		}, 500);
		$(".pinpai_2_content li.sixth").stop().animate({
			"left": 1050
		}, 500);
	});
	$(".pinpai_1 .pinpai_2_content li.third").mouseenter(function() {
		$(".pinpai_2_content li.second").stop().animate({
			"left": 150
		}, 500);
		$(".pinpai_2_content li.third").stop().animate({
			"left": 300
		}, 500);
		$(".pinpai_2_content li.forth").stop().animate({
			"left": 750
		}, 500);
		$(".pinpai_2_content li.fifth").stop().animate({
			"left": 900
		}, 500);
		$(".pinpai_2_content li.sixth").stop().animate({
			"left": 1050
		}, 500);
	});
	$(".pinpai_1 .pinpai_2_content li.forth").mouseenter(function() {
		$(".pinpai_2_content li.second").stop().animate({
			"left": 150
		}, 500);
		$(".pinpai_2_content li.third").stop().animate({
			"left": 300
		}, 500);
		$(".pinpai_2_content li.forth").stop().animate({
			"left": 450
		}, 500);
		$(".pinpai_2_content li.fifth").stop().animate({
			"left": 900
		}, 500);
		$(".pinpai_2_content li.sixth").stop().animate({
			"left": 1050
		}, 500);
	});
	$(".pinpai_1 .pinpai_2_content li.fifth").mouseenter(function() {
		$(".pinpai_2_content li.second").stop().animate({
			"left": 150
		}, 500);
		$(".pinpai_2_content li.third").stop().animate({
			"left": 300
		}, 500);
		$(".pinpai_2_content li.forth").stop().animate({
			"left": 450
		}, 500);
		$(".pinpai_2_content li.fifth").stop().animate({
			"left": 600
		}, 500);
		$(".pinpai_2_content li.sixth").stop().animate({
			"left": 1050
		}, 500);
	});
	$(".pinpai_1 .pinpai_2_content li.sixth").mouseenter(function() {
		$(".pinpai_2_content li.second").stop().animate({
			"left": 150
		}, 500);
		$(".pinpai_2_content li.third").stop().animate({
			"left": 300
		}, 500);
		$(".pinpai_2_content li.forth").stop().animate({
			"left": 450
		}, 500);
		$(".pinpai_2_content li.fifth").stop().animate({
			"left": 600
		}, 500);
		$(".pinpai_2_content li.sixth").stop().animate({
			"left": 750
		}, 500);
	});
	/*******************************酒友******************************************/
	var friend_index = 1;
	$.when($.ajax("js/renqi.json"), $.ajax("css/renqi.template")).done(function(data, template) {
		//					console.log(template)
		var _html = "",
			data = data[0],
			template = template[0],
			timer3 = null,
			len = data.length;
		//						console.log(template)
		for(var i = 0; i < len; i++) {
			_html += template.replace("商品名称", data[i].name)
				.replace("商品价格", data[i].price)
				.replace("图片路径", data[i].img)
				.replace("商品访问量", data[i].amount)
				//						console.log(template)
		}
		$(".jiuyou_content").html(_html);
		/*$(".jiuyou_window").hover(function(){
			clearInterval(timer3);
		},function(){
			timer3 = setInterval(friend_Go,3000)
		}).trigger("mouseleave")*/
		$(".btn-prev").on("click", function() {
			//						alert("1")
			friend_index -= 2;
			if(friend_index < 0) {
				friend_index = 4;
				//							return;
			}
			console.log(friend_index)
			friend_Go();
		});
		$(".btn-next").on("click", function() {
			if(friend_index > 4) {
				friend_index = 0;
				//							return;
			}
			friend_Go();
		})
	});
	/**************************进口葡萄酒**************************************/
	var timer4 = null,
		jinkou_index = 1;
	$(".jinkou_middle").hover(function() {
		clearInterval(timer4);
	}, function() {
		timer4 = setInterval(jinKou, 3000)
	}).trigger("mouseleave")

	/**************************footer**************************************/
	$.ajax("css/footer.template").done(function(data) {
		$("#foot_window").html(data)
	})

	//				console.log($.cookie("users"))
	/**************************楼层导航**************************************/
	$(window).on("scroll", function() {
		if($(".list").offset().top <= $(this).scrollTop()) {
			$(".nav_floor").stop().animate({
				right: 0
			})
		} else {
			$(".nav_floor").stop().animate({
				right: -70
			})
		}
		$(".body_title").find("h3").each(function(floor_index, ele) {
			if($(this).offset().top <= $(window).scrollTop()) {
				$(".nav_floor").find("li").eq(floor_index).children().css({
					background: "#000",
					color: "#fff"
				}).parent("li").siblings(":not(:last)").children("a").css({
					background: "#d3161b"
				})
			}
		})
		$(".nav_floor").find("a").off("click");
		$(".nav_floor").find("a:not(:last)").on("click", function() {
			$(this).parent("li").siblings(":not(:last)").children("a").css({
				background: "#d3161b"
			})
			var li_index = $(this).parents("li").index();
			var h3_top = $(".body_title").find("h3").eq(li_index).offset().top;
			$("html,body").stop().animate({
				scrollTop: h3_top
			})

		});
		$("._top").on("click", function() {
			$("html,body").scrollTop(0)
		})
	})

	/**************************轮播图**************************************/
	function go() {
		//					clearInterval(timer);
		$(".banner li").eq(currIndex).stop().fadeOut().end().eq(imgIndex).stop().fadeIn();
		currIndex = imgIndex;
		$(".circle").children("div").eq(imgIndex).addClass("curr").siblings().removeClass();
		imgIndex++;
		if(imgIndex >= len)
			imgIndex = 0;
	}
	/**************************猜你喜欢ajax**************************************/
	var page = 0

	function gusee_Change() {
		$.when($.ajax("css/gusee_product.template"), $.ajax("js/gusee_product.json")).done(function(template, data) {
			var data = data[0],
				template = template[0],
				len = data.length;
			//							console.log(data[i].name)
			for(var i = 0; i < 6; i++) {
				//							console.log(data[page + i].price)
				_html += template.replace("商品名称", data[page + i].name)
					.replace("英文名", data[page + i].english)
					.replace("国籍", data[page + i].country)
					.replace("种类", data[page + i].type)
					.replace("商品好评度", data[page + i].amount)
					.replace("图片路径", data[page + i].img)
					.replace("商品价格", data[page + i].price)
			}
			$(".gusee_content_right").html(_html);

		})
	}
	/*******************************之前买过的播******************************************/
	function before_go() {
		$(".buy_before_go").stop().animate({
			left: -before_index * $(".buy_before_left_active").outerWidth()
		})
		$(".buy_before_circle").children("div").eq(before_index).css({
			background: "#cd0005"
		}).siblings().css({
			background: "#c9c9c9"
		})
		before_index++;
		if(before_index > 2)
			before_index = 0;
	}
	/*******************************酒友******************************************/
	function friend_Go() {
		//					clearInterval(timer3)
		$('.jiuyou_content').stop().animate({
			left: -friend_index * $('.jiuyou_content').parent().innerWidth()
		}, 1000)
		$(".txt-page").html(friend_index + 1)
		friend_index++;
	}

	function jinKou() {
		$(".jinkou_middle ul").stop().animate({
			left: -jinkou_index * $(".jinkou_middle").find("li").eq(0).outerWidth()
		})
		jinkou_index++;
		if(jinkou_index === 4) {
			jinkou_index = 0;
		}
	}

})