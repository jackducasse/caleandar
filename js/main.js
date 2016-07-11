var data = [
  {'Date': new Date(2016, 6, 6), 'Title': (Math.round(Math.random()*10)) + ' Reviews', 'Link': 'World!'},
  {'Date': new Date(2016, 6, 8), 'Title': (Math.round(Math.random()*10)) + ' Reviews', 'Link': 'World!'},
  {'Date': new Date(2016, 6, 10), 'Title': (Math.round(Math.random()*10)) + ' Reviews', 'Link': 'World!'},
  {'Date': new Date(2016, 6, 14), 'Title': (Math.round(Math.random()*10)) + ' Reviews', 'Link': 'World!'},
  {'Date': new Date(2016, 6, 17), 'Title': (Math.round(Math.random()*10)) + ' Reviews', 'Link': 'World!'},
  {'Date': new Date(2016, 6, 19), 'Title': (Math.round(Math.random()*10)) + ' Reviews - do them today.', 'Link': 'World!'}
];
var settings = {
  Color: '',
  LinkColor: '',
  DisabledDays: [0,6],
  EventClick: function(x){
    alert('Hello, ' + x);
  }
};
var el = document.getElementById('caleandar');
caleandar(el, data, settings);
