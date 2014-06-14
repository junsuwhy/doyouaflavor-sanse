
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

			function offscroll(trig){
				$(window).off("scroll",trig);
			}
		});
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



