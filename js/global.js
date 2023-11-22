//$('.page-secondary-nav').on('mousewheel', function (e) {
//    console.log(e);
//});
$(function () {
    var $homeGallery = $('.home-gallery');
    var $slides = $homeGallery.find('.slide');
    var $pager = $homeGallery.find('.pager');
    var $current = $slides.eq(0);
    var $controls = $homeGallery.find('.control');
    $current.addClass('current');

    $slides.each(function (index) {
        $pager.append('<span style="animation-delay:' + 0.1 * index + 's"/>');

    });
    function updateBlurImageSrc() {
        $slides.each(function (index) {
            const $img = $(this).find('.image img').eq(0);
             
            const window_width = window.innerWidth;
            if (window_width > 1400) {
                $img.attr('src', $img.data('srcset-four'));
            }
            else if (window_width > 1024) {
                $img.attr('src', $img.data('srcset-three'));
            }
            else if (window_width > 480) {
                $img.attr('src', $img.data('srcset-two'));
            }
            else {
                $img.attr('src', $img.data('srcset-one'));
            }

            var imgsrc = $(this).find('.image img')[0].currentSrc;
            $(this).find('.image')[0].style.backgroundImage = "url(" + imgsrc + ")";
        });
    }
    window.addEventListener('resize', function () {
        updateBlurImageSrc();
    });
    updateBlurImageSrc();
    var $pagingItems = $pager.find('span');
    $pagingItems.eq(0).addClass('current');

    $currentPager = $pagingItems.eq(0);

    pictureImageLazy($current);

    function goToNext() {
        var $next = $current.next().length ? $current.next() : $slides.eq(0);
        pictureImageLazy($next);
        $next.addClass('current');
        $current.removeClass('current');
        $current = $next;
        updatePager();
    }
    function goToPrevious() {
        var $previous = $current.prev().length ? $current.prev() : $slides.eq($slides.length - 1);
        pictureImageLazy($previous);
        $previous.addClass('current');
        $current.removeClass('current');
        $current = $previous;
        updatePager();
    }
    $controls.on('click', function () {
        clearInterval(slideShowInterval);
        if ($(this).hasClass('next')) {
            goToNext();
        }
        else {
            goToPrevious();
        }
    });
    $pagingItems.on('click', function () {
        var clickedIndex = $(this).index();
        $current.removeClass('current');
        $current = $slides.eq(clickedIndex);
        pictureImageLazy($current);
        $current.addClass('current');

        updatePager();
        clearInterval(slideShowInterval);
    });
    function updatePager() {
        $currentPager.removeClass('current');

        $currentPager = $pagingItems.eq($current.index());

        $currentPager.addClass('current');
    }
    var slideShowInterval = setInterval(function () {
        goToNext();
    }, 5000);

    function pictureImageLazy($slide) {
        return;
        var $picture = $slide.find('picture');
        var $template = $picture.find('template');
        if ($template.length) {
            $picture.html($template.html());
            var imgsrc = $picture[0].querySelector('img').currentSrc;
            console.log(imgsrc);
            $picture.css({ 'background-image': 'url(' + imgsrc + ')' });
        }
    }


});

function ToggleMegaMenu(action) {
    if (action == 'show') {
        $('#MegaMenu').addClass('show');
        $('body').css({ 'overflow-y': 'hidden' });

    }
    else if (action == 'hide') {
        $('#MegaMenu').removeClass('show');
        $('body').css({ 'overflow-y': 'auto' });
    }
}
$(document).keyup(function (e) {
    if (e.key === "Escape") {
        ToggleMegaMenu('hide');
    }
});


$('.nav-toggle').on('click', function () {
    ToggleMegaMenu('show');
});
$('.mega-menu .close').on('click', function () {
    ToggleMegaMenu('hide');
});
$('.back-to-top').on('click', function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 1200);
});
setInterval(function () {
    if (window.scrollY > window.innerHeight)
        $('.global-controls').addClass('show');
    else $('.global-controls').removeClass('show');
}, 1000);
var _sliderSlidingDuration = 900;
$('.slider .control').on('click', function () {
    var $_slider = $(this).parents('.slider');

    if ($_slider.hasClass('sliding'))
        return;

    $_slider.addClass('sliding');

    var $_slides = $_slider.find('.slide');

    var $activeSlide = $_slides.filter('.active');
    if ($activeSlide.length == 0) {
        $activeSlide = $_slides.first();
    }

    var $nextIn;
    if ($(this).hasClass('next')) {
        $nextIn = $activeSlide.next().length ? $activeSlide.next() : $_slides.first();

        $nextIn.stop().css({ 'left': '100%' }).animate({ 'left': '0' }, _sliderSlidingDuration);
        $activeSlide.stop().css({ 'left': '0%' }).animate({ 'left': '-100%' }, _sliderSlidingDuration);
    }
    if ($(this).hasClass('prev')) {
        $nextIn = $activeSlide.prev().length ? $activeSlide.prev() : $_slides.last();

        $nextIn.stop().css({ 'left': '-100%' }).animate({ 'left': '0' }, _sliderSlidingDuration);
        $activeSlide.stop().css({ 'left': '0%' }).animate({ 'left': '100%' }, _sliderSlidingDuration);
    }
    $nextIn.addClass('active');
    $activeSlide.removeClass('active');
    setTimeout(function () {
        $_slider.removeClass('sliding');
    }, _sliderSlidingDuration)

});

$('body').on('click', '.local-link', function (e) {
    var _href = $(this).attr('href');
    var targetElement = $(_href);
    if (targetElement.length == 0) {
        e.preventDefault();
        return true;
    }

    var _to = targetElement.offset().top - 30;
    $('html, body').stop().animate({ scrollTop: _to }, 900);
});
$('.rich-text img, .rich-text video').each(function () {
    $(this).removeAttr('height');
    //$(this).removeAttr('width');
});
$('.rich-text a').each(function () {
    //if (location.hostname != this.href.hostname && this.href != "#") {
    //}

    if (this.href.startsWith(location.origin) == false) {
        $(this).attr("target", "_blank");

    }


    //$(this).removeAttr('width');
});
$('.rich-text table').each(function () {
    $(this).removeAttr('border');
});
$('.rich-text iframe').each(function () {
    $(this).removeAttr('width');
    $(this).removeAttr('height');
    $(this).removeAttr('style');
});
$('.rich-text p').each(function () {
    var _value = $(this).text();
    if (_value == '\xa0')
        $(this).text("");
});


// Mobile


var isSmallScreen = function () { return window.innerWidth <= 480 }
var smoothScrollOptions = { behavior: "smooth", block: "end", inline: "nearest" };

window.addEventListener('load', function () {
    if (isSmallScreen()) {
        var $current_page_nav = $('.page-nav a.current');
        if ($current_page_nav.length) {
            $('.page-nav').animate({ scrollLeft: $current_page_nav.position().left })

        }
        var $current_page_secondary_nav = $('.page-secondary-nav a.current');
        if ($current_page_secondary_nav.length) {
            $('.page-secondary-nav').animate({ scrollLeft: $current_page_secondary_nav.position().left });
        }
    }
});

$(function () {
    if ($('.page-news-post').length && document.referrer.length && document.referrer.indexOf("www.iiserpune.ac.in") > -1) {
        document.querySelector('.news-post-section').scrollIntoView();
    }
});


// /Mobile

// News Cards Scroll Controls
/*

$('.news-cards-scroll-controls .control').on('click', function (e) {
    var $scrollTarget = $('.news-cards-pinned');
    var scrollTargetNative = $scrollTarget[0];

    var scrollBy = $scrollTarget.width() / 2;

    if ($(this).hasClass('next')) {
        scrollBy = Math.min(scrollBy, scrollTargetNative.scrollLeft + scrollTargetNative.clientWidth);
        $scrollTarget.stop().animate({ scrollLeft: "+=" + scrollBy }, 800);
    }
    else {
        scrollBy = Math.min(scrollBy, $scrollTarget.scrollLeft());
        $scrollTarget.stop().animate({ scrollLeft: "-=" + scrollBy }, 800);
    }
});
function ToggleNewsScrollControls() {
    var $scrollTarget = $('.news-cards-pinned');
    var scrollTargetNative = $scrollTarget[0];

    if (scrollTargetNative.scrollLeft > 0) {
        $('.news-cards-scroll-controls .control.prev').prop('disabled', false);
    }
    else {
        $('.news-cards-scroll-controls .control.prev').prop('disabled', true);
    }

    if (scrollTargetNative.scrollWidth <= scrollTargetNative.scrollLeft + scrollTargetNative.clientWidth) {
        $('.news-cards-scroll-controls .control.next').prop('disabled', true);
    }
    else {
        $('.news-cards-scroll-controls .control.next').prop('disabled', false);
    }

}

$('.news-cards-pinned').on('scroll', function () {
    ToggleNewsScrollControls();
});
if ($('.news-cards-pinned').length) {
    ToggleNewsScrollControls();
}
*/
// /News Cards Scroll Controls

// scroll with arrows

function UpdateAllScrollWithArrow() {
    var scrollWithArrow = document.querySelectorAll('.scroll-with-arrow');

    scrollWithArrow.forEach(function (el_scrollToScroll) {
        var scroll_positions = GetScrollingProperties(el_scrollToScroll);
        var controls = document.querySelector(el_scrollToScroll.getAttribute('data-scroll-controls'));
        var control_prev = controls.querySelector('.control.prev');
        var control_next = controls.querySelector('.control.next');

        if (scroll_positions.canScrollLeft) {
            control_prev.disabled = false;
        }
        else {
            control_prev.disabled = true;
        }
        if (scroll_positions.canScrollRight) {
            control_next.disabled = false;
        }
        else {
            control_next.disabled = true;
        }

    });
}

function GetScrollingProperties(el) {
    var scrolled = el.scrollLeft;
    var scrollWidth = el.scrollWidth;
    var width = el.clientWidth;
    var canScrollLeft = scrolled > 0;
    var canScrollRight = scrolled + width < scrollWidth;
    return {
        scrolled, scrollWidth, width, canScrollLeft, canScrollRight
    }
}
function ScrollWithArrow(direction, elementToScroll_selector) {
    console.log(elementToScroll_selector);
    var elementToScroll = document.querySelector(elementToScroll_selector);
    var scroll_positions = GetScrollingProperties(elementToScroll);

    var to = direction == 'right' ? scroll_positions.scrolled + scroll_positions.width : scroll_positions.scrolled - scroll_positions.width

    elementToScroll.scrollTo({
        left: to,
        top: 0,
        behavior: 'smooth'

    });
}

setInterval(function () {
    UpdateAllScrollWithArrow();
}, 100);



// /scroll with arrows

// Home Events

$('.home-events .sidebar a').on('click', function (e) {
    var categorySlug = this.dataset.categorySlug;
    if (undefined === categorySlug) return true;

    e.preventDefault();
    var $contentArea = $('.home-events .content-area');
    $contentArea.html("......");
    $contentArea.load("/events/homeEvents?category=" + categorySlug);

    $('.home-events .sidebar a.active').removeClass('active')
    $(this).addClass('active');
}).eq(0).trigger('click');

// Home Events

// latest at iiser
$('.home-latest-at-iiser .poster').on('click', function () {
    var $media = $(this).parents('.media');
    var $iframe = $media.find('iframe');
    $media.addClass('show-video');

    $iframe.attr('src', $media.data("frame-src"));
});
// /latest at iiser


// Admission Tabs
$('.admission-module .admission-module-navbar a').on('click', function (e) {
    e.preventDefault();
    var _href = $(this).attr('href');
    var $target = $(_href);
    $target.addClass('active');
    $target.siblings().removeClass('active');
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    var _navbar = document.querySelector('.admission-module .admission-module-navbar');
    _navbar.scrollTo({
        left: $(this).position().left + _navbar.scrollLeft,
        top: 0,
        behavior: "smooth"
    });

}).eq(0).trigger('click');

if ($('.admission-module .admission-module-navbar a').length) {
    var _hash = location.hash;
    if (_hash.length) {
        var $_anchors = $('.admission-module-navbar a');
        for (var i = 0; i < $_anchors.length; i++) {
            var $anchor = $_anchors.eq(i);
            if (_hash == $anchor.attr('href')) {
                //console.log('will trigger');
                //console.log($anchor);
                setTimeout(function () {
                    $anchor.trigger('click');
                }, 100);
                //console.log('triggered click');
                break;
            }

        }
    }

}



// /Admission Tabs

// Library

$('.library-search-module .tabs .tab-links a').on('click', function (e) {
    e.preventDefault();
    var _href = $(this).attr('href');
    var _target = $(_href);
    _target.siblings().removeClass('current');
    $(this).siblings().removeClass('current');
    $(this).addClass('current');
    _target.addClass('current');
});
$('.js-show-library-search').on('click', function (e) {
    e.preventDefault();
    var $LibrarySearchModule = $('#LibrarySearchModule');
    $LibrarySearchModule.addClass('show');
    $('html, body').stop().animate({ scrollTop: $LibrarySearchModule.offset().top - 60 });
});

// /Library


// Person profile

function GenerateOnPageLinksforProfilePage() {
    var $pageSecondaryNav = $('.page-secondary-nav');
    $("#ProfileContent h2").each(function (index) {

        var _a = document.createElement('a');
        $(this).attr('id', "ProfileContent-" + index);
        _a.href = '#' + "ProfileContent-" + index;
        _a.innerHTML = $(this).text();
        _a.classList.add('local-link');
        $pageSecondaryNav.append(_a);
    });
}
if ($('#ProfileContent').length) {
    GenerateOnPageLinksforProfilePage();
}

// /Person profile


// forward address 

$('.page-secondary-nav a').on('click', function () {
    sessionStorage.setItem("forwardAddress", this.href);
});

function goToForwardAddress() {
    var forwardAddress = sessionStorage.getItem("forwardAddress");
    if (typeof (forwardAddress) != 'undefined' && forwardAddress == location.href) {
        var target = document.querySelector('.page-secondary-nav');
        if (target) {
            $('html, body').stop().animate({ scrollTop: $(target).offset().top - 100 }, 0);
            sessionStorage.removeItem("forwardAddress");
        }
    }
}
goToForwardAddress();

//                / forward address


// tweeter feed
var $tweeterTimelines = $('a.twitter-timeline');
if ($tweeterTimelines.length) {
    window.addEventListener('load', function () {
        var tweeterScript = document.createElement('script');
        tweeterScript.src = "https://platform.twitter.com/widgets.js";
        document.body.appendChild(tweeterScript);
    });
}
// tweeter feed