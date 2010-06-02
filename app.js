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
}

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
  
  // todo if loaded already
  $('photos').getLast().addEvent('load', function(){
    merry.next.periodical(3000, merry);
  });
  
  if ($('photos').getLast().complete) $('photos').getLast().fireEvent('load');
});