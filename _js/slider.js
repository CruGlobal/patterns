$(document).ready(function(){
	

		var interval = setInterval(slideForward, 5000);
	  	var sliding = false;
	  	var window_focus = true;
	
		/*
		 * When window loses focus stop animation from firing to prevent queue up issues
		 */
		
		$(window).focus(function() {
		  window_focus=true;
		}).blur(function() {
		  window_focus=false;
		});


	/*
	 * Forward movement
	 */
	function slideForward() {
		if(!sliding){
			if(window_focus){
				sliding = true;
				$('.slider').removeClass('slider__reverse');
				$('.js-slider4').addClass('js-off-left').removeClass('js-slider4');
				$('.js-slider1').addClass('js-slider4').removeClass('js-js-slider3');
				$('.js-slider2').addClass('js-slider1').removeClass('js-js-slider2');
				$('.js-slider3').addClass('js-slider2').removeClass('js-slider3');	
				$('.js-off-left').addClass('js-off-right').removeClass('js-off-left');
				$('.js-off-right').addClass('js-slider4').removeClass('js-off-right');
				setTimeout(function(){sliding=false}, 1200);
			}
		}
	}
	
	/*
	 * Reverse movement
	 */
	function slideReverse() {
		if(!sliding){
			sliding = true;
			$('.js-in-the-hole').addClass('js-off-right').removeClass('js-in-the-hole');
			$('.js-on-deck').addClass('js-in-the-hole').removeClass('js-on-deck');
			$('.js-at-bat').addClass('js-on-deck').removeClass('js-at-bat');
			$('.js-last-up').addClass('js-at-bat').removeClass('js-last-up');
			$('.js-off-right').addClass('js-off-left').removeClass('js-off-right');
			$('.js-off-left').addClass('js-last-up').removeClass('js-off-left');
			setTimeout(function(){sliding=false}, 1200);
			}
	}



	/*
	 * Pause the slider on hover
	 */
    $('.slider__item').hover(function() {
        clearInterval(interval);
    }, function() {
        interval = setInterval(slideForward, 5000);	
    });
	
    $('.slider-control').hover(function() {
        clearInterval(interval);
    }, function() {
        interval = setInterval(slideForward, 5000);	
    });
	
	
	
	/*
	 * Move the slide forward when the user clicks the next button
	 */
	 $('.slider-control__next').click(function(e) {
		 e.preventDefault();
		 
		 $('.slider').removeClass('slider__reverse');
		 slideForward();
	 });
	
	
	
	/*
	 * Reverse the slider when the user clicks the previous button
	 */
	 $('.slider-control__prev').click(function(e) {
		 e.preventDefault();
		 
		 $('.slider').addClass('slider__reverse');
 		  slideReverse();
	 });
	
	
});

