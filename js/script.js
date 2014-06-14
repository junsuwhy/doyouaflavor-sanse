
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
$('.position img').wjin('lightSpeedIn');


$('.link>div').hoverAni('rubberBand');
$('.link>div').clickAni('rubberBand');
setInterval(function(){
	$('.position img').addClass('animated').toggleClass('bounce');
},2000);
// $().ready(function(){
// 	$('.position img').bu();	
// });



//Egg XD
//Please type baiwei.
var str = "";
$(window).keydown(function(e){
	//b
	if(e.which == 66)str="b";
	if(e.which == 65 && str == "b")str="ba";
	if(e.which == 73 && str == "ba")str="bai";
	if(e.which == 87 && str == "bai")str="baiw";
	if(e.which == 69 && str == "baiw")str="baiwe";
	if(e.which == 73 && str == "baiwe"){
		str="";
		$('div').addClass('animated').addClass('tada');
			setTimeout(function(){
				$('div').removeClass('tada');
			}, 2000);
		setTimeout(function(){
			$('p').addClass('animated').addClass('hinge');
			$('.each-step').addClass('animated').addClass('hinge');
			$('.logo').addClass('animated').addClass('hinge');
			$('.block').addClass('animated').addClass('hinge');
			setTimeout(function(){
				$('p').removeClass('hinge').wjin('bounceInDown');
				$('.each-step').removeClass('hinge').wjin('bounceInDown');
				$('.logo').removeClass('hinge').wjin('bounceInDown');
				$('.block').removeClass('hinge').wjin('bounceInDown');
			}, 2000);
		}, 1300);
	}
	console.log(e);
});

