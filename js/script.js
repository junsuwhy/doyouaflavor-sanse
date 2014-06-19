
$.extend( $.fn ,{
	wjin:function(anistyle,s){
		s = isNaN(parseFloat( s ))? 0 : parseFloat( s );
		// console.log(this);
		var $obj = this;
		$obj.each(function(){
			var $this = $(this);
			// console.log($this);
			$this.css('opacity',0);
			var trig = function(e) {
				// console.log($(window).scrollTop());
				if(($this.offset().top - $(window).scrollTop())<($(window).height()-$this.height())){
					setTimeout(function(){
						offscroll(trig);
						$this.css('opacity','').addClass('animated').addClass(anistyle);
						setTimeout(function(){
							$this.removeClass(anistyle).removeClass('animated');
						}, 1000);
					}, s);
				}
			}
			$(window).on("scroll",trig);
			trig();

			function offscroll(trig){
				$(window).off("scroll",trig);
			}
		});

		return this;
	},
	anifin:function(func){
		this.each(function(){
			this.addEventListener("animationend",func);
		});
	},
	/**
	 * 製造底圖視差滾動，貼於螢幕上
	 * @param  {[type]} y [description]
	 * @return {[type]}   [description]
	 */
	xp:function(y){
		y=isNaN(parseFloat(y))?0:parseFloat(y);
		var x = this;
		x.css({
			"background-position-y": y,
			"background-position":"0 "+y+"px"
		});
		$(window).scroll(function(event) {
			x.css({
				"background-position-y": function(){
					return $(window).scrollTop()-x.offset().top+y;
				},
				"background-position":function(){
					var posy = $(window).scrollTop()-x.offset().top+y;
					return "0 "+posy+"px";
				}
			});
		});
		return this;
	},
	/**
	 * 加上滑鼠移入的動畫
	 * @param  {[type]} anistyle [description]
	 * @return {[type]}          [description]
	 */
	hoverAni:function(anistyle){
		this.each(function(){
			var $obj = $(this);
			// console.log($obj);
			$obj.hover(
				function(){

					$obj.addClass('animated').addClass(anistyle);
					setTimeout(function(){
						$obj.removeClass(anistyle).removeClass(anistyle);
					}, 1000);
				},function(){}
			)
		});
		return this;
	},
	clickAni:function(anistyle){
		this.each(function(){
			var $obj = $(this);
			// console.log($obj);
			$obj.click(
				function(){

					$obj.addClass('animated').addClass(anistyle);
					setTimeout(function(){
						$obj.removeClass(anistyle).removeClass(anistyle);
					}, 1000);
				}
			)
		});
		return this;
	},

	/**
	 * 加入彈入動畫
	 * @param  {[type]} s [description]
	 * @return {[type]}   [description]
	 */
	bu:function(s){
		var x = this;
		x.addClass('hide');

		s=isNaN(parseFloat(s))?0:parseFloat(s);
		$(window).scroll(function(event) {
			if((x.offset().top - $(window).scrollTop())<($(window).height()-x.height())){
				setTimeout(function(){
					x.removeClass('hide').addClass('animated bounceInUp');
				}, s);
			}
		});
		return this;
	}
});

$('.circle').hover(function(){
	$(this).removeClass('fadeOut').addClass('fadeIn');
},function(){
	var this_in_animate = $(this);
	$(this).removeClass('fadeIn').addClass('fadeOut');
	setTimeout(function(){
		this_in_animate.removeClass('fadeOut');
	}, 1000);
});

if($(window).width()>960){
	$('.header').xp();
}


for (var i = 1; i < 4; i++) {
	var j=($(window).width()<960)?0:i;
	$('.step'+i).wjin('flipInX',j*300);
};
$('.need-img').wjin('lightSpeedIn');


$('.link>div').hoverAni('rubberBand');
$('.link>div').clickAni('rubberBand');
setInterval(function(){
	$('.need-img').addClass('animated').toggleClass('bounce');
},2000);
// $().ready(function(){
// 	$('.need-img').bu();	
// });


//Egg XD
//Please type doyouaflavor.
var str = "";
var sample = "doyouaflavor";
$(window).keydown(function(e){
	//b
	var key = String.fromCharCode(e.which).toLowerCase();
	//追縱大家按鍵盤
	ga('send', 'event', 'key', 'down' , e.keyName());
	// console.log(e.keyName());
	// console.log(key);
	str=(str=="" && key == sample[0])?key:(sample.split(str).pop()[0]==key)?str+key:"";

	if(str == sample){
		//追蹤彩蛋
		ga('send', 'event', 'eggs', 'doyouaflavor');
		str="";
		$('div').addClass('animated').addClass('tada');
			setTimeout(function(){
				$('div').removeClass('tada');
			}, 1000);
		setTimeout(function(){
			$(shuffle($('p,.each-step,.logo,.block'))).each(function(i){
				var $th = $(this);
				// console.log(i);
				setTimeout(function(){
					$th.addClass('animated').addClass('hinge');
				}, i*50);
			});
			setTimeout(function(){
				$('p,.each-step,.logo,.block').removeClass('hinge').wjin('bounceInDown');
			}, 3000);
		}, 1300);
	}
});

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


/**
 * ga scroll
 * 追縱有幾個人有看到底
 */

function ga_scroll(){
	if($(window).scrollTop()+$(window).height() == $(document).height()){
		ga('send', 'event', 'scroll', 'bottom');
		// console.log("hello");
		$(window).off("scroll",ga_scroll);
	}
}
$(window).scroll(ga_scroll);
