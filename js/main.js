$(document).ready(function(){
   new WOW().init();

   // Hero slider
    var swiper = new Swiper(".hero-slider", {});

    // Logo slider
	var swiper = new Swiper(".logo-slider", {
         breakpoints: {
          1400: {
            slidesPerView: 7,
            spaceBetween: 100,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          576: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      loop: true,
      centeredSlides: false,
      speed: 6000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

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

    // Form validation
    $(document).on('click', '.submit', function() {
        var error = false
          , _this = $(this)
          , formObj = _this.parents('form')
          , emailFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
          , urlformat = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
          , telFormat = /[0-9 -()+]+$/
          , actionURL = formObj.attr('action')
          , resultsObj = formObj.find('.form-results')
          , redirectVal = formObj.find('[name="redirect"]').val();
        formObj.find('.required').removeClass('is-invalid');
        formObj.find('.required').each(function() {
            var __this = $(this)
              , fieldVal = __this.val();
            if (fieldVal == '' || fieldVal == undefined) {
                error = true;
                __this.addClass('is-invalid');
            } else if (__this.attr('type') == 'email' && !emailFormat.test(fieldVal)) {
                error = true;
                __this.addClass('is-invalid');
            } else if (__this.attr('type') == 'url' && !urlformat.test(fieldVal)) {
                error = true;
                __this.addClass('is-invalid');
            } else if (__this.attr('type') == 'tel' && !telFormat.test(fieldVal)) {
                error = true;
                __this.addClass('is-invalid');
            }
        });
        var termsObj = formObj.find('.terms-condition');
        if (termsObj.length) {
            if (!termsObj.is(':checked')) {
                error = true;
                termsObj.addClass('is-invalid');
            }
        }
        if (!error && actionURL != '' && actionURL != undefined) {
            _this.addClass('loading');
            $.ajax({
                type: 'POST',
                url: actionURL,
                data: formObj.serialize(),
                success: function(result) {
                    _this.removeClass('loading');
                    if (redirectVal != '' && redirectVal != undefined) {
                        window.location.href = redirectVal;
                    } else {
                        if (typeof (result) !== 'undefined' && result !== null) {
                            result = $.parseJSON(result);
                        }
                        formObj.find('input[type=text],input[type=url],input[type=email],input[type=tel],input[type=password],textarea').each(function() {
                            $(this).val('');
                            $(this).removeClass('is-invalid');
                        });
                        formObj.find('input[type=checkbox],input[type=radio]').prop('checked', false);
                        resultsObj.removeClass('alert-success').removeClass('alert-danger').hide();
                        resultsObj.addClass(result.alert).html(result.message);
                        resultsObj.removeClass('d-none').fadeIn('slow').delay(4000).fadeOut('slow');
                    }
                }
            });
        }
        return false;
    });
    $(document).on('blur', '.required', function() {
        var emailFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
          , telFormat = /[0-9 -()+]+$/
          , urlformat = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
          , fieldVal = $(this).val();
        if (fieldVal == '' || fieldVal == undefined) {
            $(this).addClass('is-invalid');
        } else if ($(this).attr('type') == 'email' && !emailFormat.test(fieldVal)) {
            $(this).addClass('is-invalid');
        } else if ($(this).attr('type') == 'url' && !urlformat.test(fieldVal)) {
            $(this).addClass('is-invalid');
        } else if ($(this).attr('type') == 'tel' && !telFormat.test(fieldVal)) {
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });
    $(document).on('click', '.terms-condition', function() {
        var termsObj = $(this);
        if (!termsObj.is(':checked')) {
            termsObj.addClass('is-invalid');
        } else {
            termsObj.removeClass('is-invalid').addClass('is-valid');
        }
    });
});