var header = $('header'),
    header_height = header.height();

function shrinkHeader() {

  var scrolled = -($(this).scrollTop() - header_height);

  if ($(this).scrollTop() <= header_height / 1.4) {
    header.css({
      height: scrolled
    });
  }
}

$(window).scroll(function(){
  if ($(window).width() > 640 ){
    //shrinkHeader();
  }
});