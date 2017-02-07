/*
fixMe 
put at HTML bottom

1.3
add fix equal heights
http://benhowdle.im/easy-peasy-equal-heights.html

1.2
waypoint trigger


1.1 
hijack preloader animate time ..delay its time
1/23/2017 1:31:24 PM

1.0 
fix at mobile view Hamburger menu after click menu not collaps
1/23/2017 1:23:36 PM

*/

// 1.3 equal height 

	function sameHeights(selector) {
	    var selector = selector || '[data-key="sameHeights"]',
	        query = document.querySelectorAll(selector),
	        elements = query.length,
	        max = 0;
	    if (elements) {
	        while (elements--) {
	            var element = query[elements];
	            if (element.clientHeight > max) {
	                max = element.clientHeight;
	            }
	        }
	        elements = query.length;
	        while (elements--) {
	            var element = query[elements];
	            element.style.height = max + 'px';
	        }
	    }
	}


// 1.2 waypoint trigger

			var $head = $( '#ha-header' );
			$( '.ha-waypoint' ).each( function(i) {
				var $el = $( this ),
					animClassDown = $el.data( 'animateDown' ),
					animClassUp = $el.data( 'animateUp' );

				$el.waypoint( function( direction ) {
					if( direction === 'down' && animClassDown ) {
						$head.attr('class', 'ha-header ' + animClassDown);
					}
					else if( direction === 'up' && animClassUp ){
						$head.attr('class', 'ha-header ' + animClassUp);
					}
				}, { offset: '100%' } );
			} );

// 1.0 Hamburger menu toggle
  $(".navbar-nav li a").click(function (event) {
    // check if window is small enough so dropdown is created
    var toggle = $(".navbar-toggle").is(":visible");
    if (toggle) {
      $(".navbar-collapse").collapse('hide');
    }
  });


    //Preloader

    $(".page-loader .loader").delay(300).fadeOut(); /* delay(300)ori how long to keep tha animate page */
    $(".page-loader").delay(300).fadeOut("slow"); /* delay(500)ori howlong to fade in/out */