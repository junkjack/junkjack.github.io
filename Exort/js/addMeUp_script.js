/*
addMeUp_script.js
put at HTML top/up [ before html body ]

1.1
add fix equal heights
http://benhowdle.im/easy-peasy-equal-heights.html
2/6/2017 5:47:04 PM

*/


// 1.1 equal height 

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

/* how to use in HTMl 

<div class="sameHeights">  
	<div data-key="sameHeights"></div> 
	<div data-key="sameHeights"></div>
</div>

how to use in HTMl */

	if ('addEventListener' in window) {
	    // first group
	    window.addEventListener('resize', function(){
	        sameHeights('[data-key="sameHeights"]');
	    });
	    window.addEventListener('load', function(){
	        sameHeights('[data-key="sameHeights"]');
	    });

	    // second group
	    window.addEventListener('resize', function(){
	        sameHeights('[data-key="otherSameHeights"]');
	    });
	    window.addEventListener('load', function(){
	        sameHeights('[data-key="otherSameHeights"]');
	    });
	}

/* how to use in HTMl 
with 2nd group

<div class="otherSameHeights">
	<div data-key="otherSameHeights"></div>
	<div data-key="otherSameHeights"></div>
</div>

how to use in HTMl */



// fixMeUp_script.js ends here