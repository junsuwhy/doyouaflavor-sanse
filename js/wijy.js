/**
 * 我寫的雜七雜八的 jquery 擴充都放在這裡吧!!
 * 
 * 要做的事: 
 *   1. wjplax 底圖視差滾動
 *   2. wjin 捲入畫面做特效 (須載入 animate.css)
 *   3. 滑鼠移入做特效 (須載入 animate.css)
 */

$.extend( $.fn ,{
	/**
	 * 製造底圖視差滾動，貼於螢幕上
	 * @param  {[type]} top 如果圖片的 top 不是在螢幕最上方，則填入圖片與螢幕的差值，預設為0
	 * @return {[type]}   [description]
	 */
	wjplax:function(top){
		top = isNaN(parseFloat( top ))? 0 : parseFloat( top );
		var $obj = this;
		$obj.css({
			"background-position-y": top,
			"background-position":"0 "+top+"px"
		});
		$(window).scroll(function(event) {
			$obj.css({
				"background-position-y": function(){
					return $(window).scrollTop()-$obj.offset().top+top;
				},
				"background-position":function(){
					var posy = $(window).scrollTop()-$obj.offset().top+top;
					return "0 "+posy+"px";
				}
			});
		});
	},
	/**
	 * 製造進入頁面時，翻滾出現的動作
	 * @param  {String} anistyle 載入的特效名稱 in animate.css
	 * @param  {Number} s 晚幾毫秒
	 * @return {[type]}   [description]
	 */
	wjin:function(anistyle,s){
		s = isNaN(parseFloat( s ))? 0 : parseFloat( s );
		var $obj = this;
		$obj.each(function(){
			var $this = $(this);
			$this.css('opacity',0);
			var trig = function(e) {
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
	/**
	 * 加上滑鼠移入的動畫
	 * @param  {[type]} anistyle [description]
	 * @return {[type]}          [description]
	 */
	
	clickAni:function(anistyle){
		this.each(function(){
			var $obj = $(this);
			// console.log($obj);
			$obj.click(
				function(){

					$obj.addClass('animated').addClass(anistyle);
					setTimeout(function(){
						$obj.removeClass(anistyle);
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
