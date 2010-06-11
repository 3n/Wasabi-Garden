var Tab = new Class({
  initialize: function(tab, elem, tabz){
    this.tab  = $(tab);
    this.elem = $(elem);
    this.tabz = tabz;

    this.tab.addEvent('click', this.activate.bind(this));
    return this;    
  },
  activate: function(){
    this.tabz.tabs.each(function(t){ t.deactivate(); });
    this.elem.setStyle('display','block');    
    this.tab.addClass('active');
    return this;
  },
  deactivate: function(){
    this.elem.setStyle('display','none');
    this.tab.removeClass('active');    
    return this;    
  }
});

var Tabz = new Class({
  initialize: function(){
    this.tabs = $A(arguments).map(function(pair){
      return new Tab(pair[0], pair[1], this).deactivate();
    }, this);
    return this;
  },
  activateIndex: function(index){    
    this.tabs[index].activate();
    return this;    
  }
});


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

var make_tabz = function(){
  var tabz = new Tabz( ['lunch-tab', 'lunch'], ['dinner-tab', 'dinner'] );  
  var hour = new Date().getHours();

  tabz.activateIndex(hour < 15 ? 0 : 1);
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
  
  // todo if loaded already
  $('photos').getLast().addEvent('load', function(){
    merry.next.periodical(3500, merry);
  });
  
  if ($('photos').getLast().complete) $('photos').getLast().fireEvent('load');
  
  make_tabz();
});