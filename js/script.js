
$.extend( $.fn ,{
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
			"background-position-y": y
		});
		$(window).scroll(function(event) {
			x.css({
				"background-position-y": function(){
					return $(window).scrollTop()-x.offset().top+y;
				}
			});
		});
	},
	/**
	 * 製造滑上來時，翻滾出現的動作
	 * @param  {Number} s 晚幾毫秒
	 * @return {[type]}   [description]
	 */
	ff:function(s){
		s=isNaN(parseFloat(s))?0:parseFloat(s);
		var x = this;
		$(window).scroll(function(event) {
			if((x.offset().top - $(window).scrollTop())<($(window).height()-x.height())){
				setTimeout(function(){
					x.removeClass('hide').addClass('flipInX');
				}, s);
			}
		});
	},
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

$('.header').xp();
for (var i = 1; i < 4; i++) {
	$('.step'+i).ff(i*300);
};

// $().ready(function(){
// 	$('.position img').bu();	
// });



