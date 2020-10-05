jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function(){
		preloader.remove();
	});

	//#main-slider
	var slideHeight = $(window).height();
	$('#home-slider .item').css('height',slideHeight);

	$(window).resize(function(){
        'use strict';
		$('#home-slider .item').css('height',slideHeight);
	});
	
	//Scroll Menu
	$(window).on('scroll', function(){
		if( $(window).scrollTop()>slideHeight ){
			$('.main-nav').addClass('navbar-fixed-top');
		} else {
			$('.main-nav').removeClass('navbar-fixed-top');
		}
	});
	
	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
        $('.navbar-collapse.collapse.in').removeClass('in');
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};

	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});
    
    if($(window).width() > 767){
        //Initiat WOW JS
        new WOW().init();
    }
	
	//smoothScroll
	smoothScroll.init();
	
	// Progress Bar
	$('#about-us').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$.each($('div.progress-bar'),function(){
				$(this).css('width', $(this).attr('aria-valuetransitiongoal')+'%');
			});
			$(this).unbind('inview');
		}
	});

	//Countdown
	$('#features').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
			$(this).unbind('inview');
		}
	});

	// Portfolio Single View
	$('#portfolio').on('click','.folio-read-more',function(event){
		event.preventDefault();
		var link = $(this).data('single_url');
		var full_url = '#portfolio-single-wrap',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_top = $("#"+trgt).offset().top;

		$('html, body').animate({scrollTop:target_top}, 600);
		$('#portfolio-single').slideUp(500, function(){
			$(this).load(link,function(){
				$(this).slideDown(500);
			});
		});
	});

	// Close Portfolio Single View
	$('#portfolio-single-wrap').on('click', '.close-folio-item',function(event) {
		event.preventDefault();
		var full_url = '#portfolio',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_offset = $("#"+trgt).offset(),
		target_top = target_offset.top;
		$('html, body').animate({scrollTop:target_top}, 600);
		$("#portfolio-single").slideUp(500);
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		console.log("coucocufierofj");
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		var data = {
			"nom": $('#name').val(),
			"email": $('#email').val(),
			"subject": $('#subject').val(),
			"message": $('#message').val(),
		};
		console.log(data);
		$.ajax({ 
     	   url: 'sendemail.php', 
	        data: data,
	        type: 'POST',
	        success: function (data) {
				// For Notification
	            document.getElementById("sendMailForm").reset();
	            var $alertDiv = $(".mailResponse");
	            $alertDiv.show();
	            $alertDiv.find('.alert').removeClass('alert-danger alert-success');
	            $alertDiv.find('.mailResponseText').text("");
	            if(data.error){
	                $alertDiv.find('.alert').addClass('alert-danger');
	                $alertDiv.find('.mailResponseText').text(data.message);
	            }else{
	                $alertDiv.find('.alert').addClass('alert-success');
	                $alertDiv.find('.mailResponseText').text(data.message);
	            }
	        }
	    });
	    event.preventDefault();
	});


	//Google Map
	var lat = 44.206721;
	var lon = 3.356994;
	var macarte = null;

	function initMap() {
		console.log("coucou");
		// Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
        macarte = L.map('map').setView([lat, lon], 6);
        //macarte.touchZoom.disable();
		//macarte.doubleClickZoom.disable();
		macarte.scrollWheelZoom.disable();
		//macarte.boxZoom.disable();
		//macarte.keyboard.disable();
        // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // Il est toujours bien de laisser le lien vers la source des données
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(macarte);


        var points_sgetas = {
        	"Sgetas": {"lat": 43.347369, "lon": 5.363744},
        	"Centre de travaux Travaillan": {"lat": 44.182890, "lon":4.902730},
        	"Centre de travaux Montpelier": {"lat": 43.611278, "lon": 3.877352},
        	"Cavaillon": {"lat": 43.837508, "lon": 5.042196}
        };

        var actions = L.polygon([
    		[42.863484, 0.729488],
		    [42.459535, 3.045501],
		    [43.288802, 3.990031],
		    [42.976119, 5.858926],
    		[43.135967, 6.433625],
    		[45.115789, 4.924500]
		]).addTo(macarte);

        for (point in points_sgetas) {
			var marker = L.marker([points_sgetas[point].lat, points_sgetas[point].lon]).addTo(macarte);
			marker.bindPopup(point);
	} 
	}

	initMap(); 
	
});

