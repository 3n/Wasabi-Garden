var open_or_closed = function(){
  var date = new Date(),
      day = date.getDay(),
      hour = date.getHours(),
      open = day > 0 && day < 7 && hour > 11 && hour < 22;

  var str = open ? 'open' : 'closed';    
  $('open-or-closed').set('html', str).set('class', str);
};

var now_serving = function(){
  var hour = new Date().getHours();

  if (hour > 15){
    $('now-serving').set('html', 'Now Serving: <a>Dinner</a>');
    $('dinner').grab($('lunch'), 'after');
  } else
    $('now-serving').set('html', 'Now Serving: <a>Lunch</a> & <a>Dinner</a>');
    
  $('now-serving').addEvent('click:relay(a)', function(){
    $(this.get('text').toLowerCase()).scroll_to();
  });
};

var slideshow = function(){
  var merry = new MerryGoRound('photos', {
    'selector'   : 'img',
    'per_page'   : 1,
    'page_controls' : true,
    'fx_options' : {
      duration : 300
    }
  });
  
  var slideshow,
      start_the_show = function(){
        slideshow = slideshow || merry.next.periodical(3500, merry);
      };
  
  $('photos').getLast().addEvent('load', start_the_show);
  
  if ($('photos').getLast().complete) $('photos').getLast().fireEvent('load');
  
  $$('.merry-go-round-pagination').addEvent('click', function(){
    $clear(slideshow);
    slideshow = null;
    start_the_show.delay(1000);
  });
};

window.addEvent('domready', function(){  
  open_or_closed();  
  slideshow();
  now_serving();
});