$(document).ready(function(){
    // counter
    function isVisible($element, partial) {
    var $window = jQuery(window),
        viewportTop = $window.scrollTop(),
        viewportBottom = viewportTop + $window.height(),
        elementTop = $element.offset().top,
        elementBottom = elementTop + $element.height(),
        compareTop = partial ? elementBottom : elementTop,
        compareBottom = partial ? elementTop : elementBottom;

    return ((compareBottom <= viewportBottom) && (compareTop >= viewportTop) && $element.is(':visible'));
    }


	$(window).scroll(function(){
	  	if(isVisible($('.number'))) {
	      if($('.number').hasClass('counter-loaded')) return;
	      $('.number').addClass('counter-loaded');
	      
			$('.number').each(function () {
			  var $this = $(this);
			  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
			    duration: 5000,
			    easing: 'swing',
			    step: function () {
			      $this.text(Math.ceil(this.Counter));
			    }
			  });
			});
	    }
	})
});