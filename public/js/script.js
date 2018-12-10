$(document).ready(function () {
    //mobile menu

    $(document).on('click', '#header-trigger', function (event) {
        event.preventDefault();
        var menu = $('.header__menu');
        if ($(this).hasClass('js-trigger-active')) {
            $(this).removeClass('js-trigger-active');
            menu.slideUp('slow');
        } else {
            $(this).addClass('js-trigger-active');
            menu.slideDown('slow');
        }
        return false;
    });


    //sliders
    $(' .gallery__slider').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

    $(' .comand__slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

    $('  .review__slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

    // tabs
    $('.price__tabs-wrapper--box').each(function (i) {
        if (i != 0) {
            $(this).hide(0)
        }
    });
    $(document).on('click', '.price__tabs a', function (event) {
        event.preventDefault();
        var tabId = $(this).attr('href');
        $('.price__tabs a').removeClass('active');
        $(this).addClass('active');
        $('.price__tabs-wrapper--box').hide(0);
        $(tabId).fadeIn();
    });


    //page-gallery slider
    window.onload = function () {
        var width = document.documentElement.clientWidth;
        var news_slider = $('.gallery__wrapper');


        if (width < 1150) {


            news_slider.addClass('news__wrapper--slider');
            $('.news__wrapper--slider').not('.slick-initialized').slick({
                arrows: false

            });


        } else {

            news_slider.removeClass('news__wrapper--slider').not('.slick-initialized');

        }


    };
    window.addEventListener('resize', function () {
        var width = document.documentElement.clientWidth;
        var news_slider = $('.gallery__wrapper');

        if (width < 1150) {

            news_slider.addClass('news__wrapper--slider');
            $('.news__wrapper--slider').not('.slick-initialized').slick({
                arrows: false
            });


        } else {

            news_slider.removeClass('news__wrapper--slider').slick('unslick');
            sliderIsLive = false;

        }
    });

    //preloader
    $(window).on('load', function () {
        $preloader = $('.loaderArea'),
            $loader = $preloader.find('.loader');
        $loader.fadeOut();
        $preloader.delay(350).fadeOut('slow');
    });
});