
$(document).ready(function() {
    // Smooth scrolling for navigation links
    $(".nav-links a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
    
    // Mobile menu toggle enhancement
    $(".hamburger").click(function() {
        $(".nav-links").slideToggle(300);
    });
    
    // Hide mobile menu when clicking outside
    $(document).click(function(event) {
        var $target = $(event.target);
        if(!$target.closest('.navbar').length && 
           $('.nav-links').is(':visible') && 
           !$target.closest('.hamburger').length) {
            $('.nav-links').slideUp(300);
        }
    });
    
    // Animated entrance for hero section
    $(".hero-content").hide().fadeIn(1200);
    
    // Category cards hover effects
    $(".category-card").hover(
        function() {
            $(this).find("img").css("transform", "scale(1.05)");
            $(this).find("h3").css("color", "#ff6b6b");
        },
        function() {
            $(this).find("img").css("transform", "scale(1)");
            $(this).find("h3").css("color", "");
        }
    );
    
    // Featured products carousel
    let currentSlide = 0;
    const totalSlides = $(".product-item").length;
    const visibleSlides = Math.min(4, totalSlides);
    
    // Set up auto-scroll for product slider
    function nextSlide() {
        currentSlide = (currentSlide + 1) % (totalSlides - visibleSlides + 1);
        updateSlider();
    }
    
    function updateSlider() {
        const itemWidth = $(".product-item").outerWidth(true);
        $(".product-slider").animate({
            scrollLeft: currentSlide * itemWidth
        }, 500);
    }
    
    // Auto scroll products every 5 seconds
    let productInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-scroll on hover
    $(".product-slider").hover(
        function() { clearInterval(productInterval); },
        function() { productInterval = setInterval(nextSlide, 5000); }
    );
    
    // Add navigation arrows for product slider
    $(".featured-products").append('<div class="slider-nav"><button class="prev-btn">❮</button><button class="next-btn">❯</button></div>');
    
    $(".prev-btn").click(function() {
        currentSlide = Math.max(0, currentSlide - 1);
        updateSlider();
    });
    
    $(".next-btn").click(function() {
        currentSlide = Math.min(totalSlides - visibleSlides, currentSlide + 1);
        updateSlider();
    });
    
    // Enhanced product interactions
    $(".product-item").hover(
        function() {
            $(this).addClass("product-hover");
            $(this).find(".add-to-cart").addClass("show-cart-button");
        },
        function() {
            $(this).removeClass("product-hover");
            $(this).find(".add-to-cart").removeClass("show-cart-button");
        }
    );
    
    // Add to cart animation
    $(".add-to-cart").click(function(e) {
        e.preventDefault();
        
        // Create a clone of the product image for animation
        const productImg = $(this).parent().find("img");
        const imgClone = productImg.clone()
            .offset({
                top: productImg.offset().top,
                left: productImg.offset().left
            })
            .css({
                'opacity': '0.7',
                'position': 'absolute',
                'height': '150px',
                'width': 'auto',
                'z-index': '100'
            })
            .appendTo($('body'))
            .animate({
                'top': $(".logo").offset().top + 10,
                'left': $(".logo").offset().left + 10,
                'width': 75,
                'height': 75
            }, 800, 'easeInOutExpo');
        
        setTimeout(function () {
            imgClone.remove();
        }, 1000);
        
        // Show cart confirmation message
        const productName = $(this).parent().find("h3").text();
        showNotification(productName + " added to cart!");
    });
    
    // Notification system
    function showNotification(message) {
        if ($("#notification").length === 0) {
            $("body").append('<div id="notification"></div>');
        }
        
        $("#notification")
            .text(message)
            .addClass("show-notification")
            .removeClass("hide-notification");
        
        setTimeout(function() {
            $("#notification")
                .addClass("hide-notification")
                .removeClass("show-notification");
        }, 3000);
    }
    
    // Testimonial cards animations
    $(".testimonial-card").each(function(index) {
        $(this).css("animation-delay", (index * 0.2) + "s");
    });
    
    // Newsletter form animation and validation
    $(".newsletter-form").submit(function(e) {
        e.preventDefault();
        const email = $(this).find("input[type='email']").val();
        
        if (validateEmail(email)) {
            $(this).slideUp();
            $(".newsletter-content").append('<p class="success-message">Thank you for subscribing!</p>');
            $(".success-message").hide().fadeIn();
        } else {
            showNotification("Please enter a valid email address");
        }
    });
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Animated counter for sales (for promo banner)
    $(".promo-content").append('<div class="countdown">Sale ends in: <span id="days">00</span>:<span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span></div>');
    
    // Set the countdown date (7 days from now)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7);
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        $("#days").text(String(days).padStart(2, '0'));
        $("#hours").text(String(hours).padStart(2, '0'));
        $("#minutes").text(String(minutes).padStart(2, '0'));
        $("#seconds").text(String(seconds).padStart(2, '0'));
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            $(".countdown").html("Sale has ended!");
        }
    }, 1000);
    
    // Back to top button
    $("body").append('<button id="back-to-top" title="Back to top">↑</button>');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    
    $('#back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
    
    // Add parallax effect to hero section
    $(window).scroll(function() {
        const scrollPos = $(this).scrollTop();
        $(".hero").css({
            'background-position': '50% ' + (scrollPos * 0.2) + 'px'
        });
    });
    
    // Lazy loading images for better performance
    $("img").each(function() {
        $(this).attr("loading", "lazy");
    });
});