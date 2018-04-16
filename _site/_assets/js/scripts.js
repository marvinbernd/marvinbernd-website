$(document).foundation();

$(document).ready(function() {
  // slick carousel
  $('.start-slider').slick({
    dots: false,
    arrows: true,
    vertical: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    verticalSwiping: true,
    centerMode: false,
    adaptiveHeight: true,
    autoplay: true
  });
  $('.project-slider').slick({
    dots: false,
    arrows: true,
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    verticalSwiping: true,
    centerMode: false,
    adaptiveHeight: true,
    autoplay: true
  });
});
