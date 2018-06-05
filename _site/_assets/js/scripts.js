$(document).foundation();

new cookieNoticeJS({
 // Localizations of the notice message
 'messageLocales': {
   'de': 'Diese Website nutzt Cookies, um bestmögliche Funktionalität bieten zu können. Durch die Nutzung der Website erklären Sie sich mit der Verwendung von Cookies einverstanden.'
 },
 // Localizations of the dismiss button text
 'buttonLocales': {
   'de': 'Ok'
 },
 // Position for the cookie-notifier (default=bottom)
 'cookieNoticePosition':'bottom',
 // Shows the "learn more button (default=false)
 'learnMoreLinkEnabled': true,
 // The href of the learn more link must be applied if (learnMoreLinkEnabled=true)
 'learnMoreLinkHref':' https://www.marvinbernd.de/impressum/',
 // Text for optional learn more button
 'learnMoreLinkText':{
     'de':'Mehr Infos'
 },
 // The message will be shown again in X days
 'expiresIn': 7,
 // Dismiss button background color
 'buttonBgColor': '#000',
 // Dismiss button text color
 'buttonTextColor': '#fff',
 // Notice background color
 'noticeBgColor': '#fff',
 // Notice text color
 'noticeTextColor': '#000',
 // the lernMoreLink color (default='#009fdd')
 'linkColor':'#000'
});

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

  var instafeed = $('body').find('#instafeed');
  if (instafeed.length > 0) {
    getData().then(function(result) {
      $('#instafeed').append('<div class="grid-x grid-margin-x"></div>');
      for (var i = 0; i < 6; i++) {
        $('#instafeed .grid-x').append(
          '<div class="cell small-6 large-4">' +
            '<a href="' + result[i].link + '" target="_blank">' +
              '<div class="instafeed-image-wrapper">' +
                '<img src="' + result[i].images.low_resolution.url + '" />' +
              '</div>' +
            '</a>' +
          '</div>'
        );
      }
    }).then(function() {
      instaMakeSquare();
    });

    $( window ).resize(function() {
      instaMakeSquare();
    });

    function instaMakeSquare() {
      $('#instafeed .instafeed-image-wrapper').each(function() {
        var width = $(this).width();
        $(this).height(width + 'px');
      });
    }
  }

});
