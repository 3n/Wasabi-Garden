window.addEvent('domready', function(){
  var merry = new MerryGoRound('photos', {
    'selector'   : 'img',
    'per_page'   : 1,
    'page_controls' : true,
    'fx_options' : {
      duration : 300
    }
  });
  
  merry.next.periodical(3000, merry);
});