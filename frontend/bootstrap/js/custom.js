$(function() {
    'use strict';
    /* mobile menu */
    $(document).ready(function() {
        const $menuIcon = $("#menuIcon");
        const $menu = $("#menu");
        const $closeBtn = $("#closeBtn");
        $menuIcon.on("click", function() {
            $menu.toggleClass("active");
        });
        $closeBtn.on("click", function() {
            $menu.removeClass("active");
        });
    });
    /* # mobile menu */

});
/* menu inner tab */
$(document).ready(function() {

    const navLinks = document.querySelectorAll('.three-menu .nav-link');
    const tabPanes = document.querySelectorAll('.innertab-pane');

    function switchTab(tabId) {
        // Hide all tab panes and remove the 'active' class from all links
        tabPanes.forEach(tab => tab.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Show the clicked tab's content and add 'active' class to the clicked link
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        const activeLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Add event listeners to each nav-link to switch tabs when clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Initialize the first tab as active
    switchTab('tab1');

    // Dropdown menu handling (existing jQuery code)
    $('.menu-container .dropdown-toggle').click(function() {
        $('.menu-container .dropdown-menu').toggle();
        // console.log('werwer');
        const active = document.getElementById("active-element");
        const activeTab = document.getElementById("tab1");
        active.classList.add("active");
        activeTab.classList.add("active");
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.menu-container').length) {
            $('.menu-container .dropdown-menu').hide();
            $('.menu-container .nav-link.active').show();
        }
    });
});

/* menu inner tab */
/* slider */
$(document).ready(function() {
    $('.domestic, .international').each(function() {
        const $slider = $(this);
        const id = $slider.attr('id');
        const $container = $slider.parent();

        // Get the swiper container element by ID
        const sliderElement = document.getElementById(id);

        // Initialize Swiper for each slider
        const swiper = new Swiper(sliderElement, {
            // a11y: {
            //     prevSlideMessage: 'Previous slide',
            //     nextSlideMessage: 'Next slide',
            // },
            autoplay: {
                // delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: $container.find('.swiperSignpostingNext')[0],
                prevEl: $container.find('.swiperSignpostingPrev')[0],
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                    centeredSlides: false,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                    centeredSlides: false,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
            },
            loop: true,
            simulateTouch: false,
            centeredSlides: true,
            dots: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    });

});

$(document).ready(function() {
    /* 4 slider show */
    $('.four-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        responsive: [{
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    /* 3 slider show */
    $('.three-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 2,
        // autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        responsive: [{
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    /* testmonial */
    var swiper = new Swiper(".testmonial", {
        slidesPerView: 2,
        spaceBetween: 30,
        freeMode: true,
        autoplay: true,
        cssMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        mousewheel: true,
        keyboard: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 20,
            }
        }
    });

    $('.review-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        autoplay: false,
        dots: false,
        arrows: true,
        infinite: true,
        responsive: [{
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});