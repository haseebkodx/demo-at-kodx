(function ($) {
  "use strict";

  // Mobile Navigation
  if ($('#navbar1').length) {
    var $mobile_nav = $('#navbar1').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('nav.main-nav div.container-fluid').append('<button type="button" class="mobile-nav-toggle d-sm-none text-right"><i class="fa fa-bars"><span class="sr-only">Mobile Menu Button</span></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('.mobile-nav-overly').toggle();
    });
    
    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  $(document).ready(function(){
    if($(window).scrollTop() !== 0) {
      $('#header').addClass( 'header-scrolled' );
      $('nav.navbar').prepend('<a class="nav-logo-link d-none d-sm-inline-block" href="#"><img class="dod-logo logo-xs d-none d-sm-inline-block" alt="Department of Defense: Mentor-Protégé Program Seal" src="img/mpp-logo.png" /></a>');
    } else {
      $('nav.navbar').find('.nav-logo-link').remove();
    }
  
    $(window).scroll(function(){
      if ($('#header').hasClass( 'header-scrolled' ) ) {
        if ($('nav.navbar').children().length == 1) {
          $('nav.navbar').prepend('<a class="nav-logo-link d-none d-sm-inline-block" href="#"><img class="dod-logo logo-xs d-none d-sm-inline-block" alt="Department of Defense: Mentor-Protégé Program Seal" src="img/mpp-logo.png" /></a>');
        }
        // alert('boom');
        // $('nav.navbar').prepend('<img class="dod-logo logo-xs" alt="Department of Defense: Mentor-Protégé Program Seal" src="img/mpp-logo.png" />');
      };
      if (!$('#header').hasClass( 'header-scrolled' ) ) {
        $('nav.navbar').find('.nav-logo-link').remove();
      };
    });
  
  });

})(jQuery);
