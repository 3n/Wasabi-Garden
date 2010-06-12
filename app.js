var open_or_closed = function(){
  var date = new Date(),
      day = date.getDay(),
      hour = date.getHours(),
      open = false;

  if (day > 0 && day < 7)
    if (hour > 11 && hour < 22) 
      open = true;
  else
    if (hour > 12 && hour < 21) 
      open = true;
      
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

window.addEvent('domready', function(){  
  open_or_closed();
  
  var merry = new MerryGoRound('photos', {
    'selector'   : 'img',
    'per_page'   : 1,
    'page_controls' : true,
    'fx_options' : {
      duration : 300
    }
  });
  
  var slideshow;
  $('photos').getLast().addEvent('load', function(){
    slideshow = merry.next.periodical(3500, merry);
  });
  
  if ($('photos').getLast().complete && !slideshow) $('photos').getLast().fireEvent('load');
  
  now_serving();
});