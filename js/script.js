
$.extend( $.fn ,{
	anifin:function(func){
		this.each(function(){
			this.addEventListener("animationend",func);
		});
	},
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



