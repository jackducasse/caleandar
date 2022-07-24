var events = [
	{'Date': new Date(2022, 5, 28), 'Title': 'Previous month event'},
  	{'Date': new Date(2022, 6, 7, 15, 25, 0), 'Title': 'Doctor appointment at 3:25pm.'},
  	{'Date': new Date(2022, 6, 18), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
  	{'Date': new Date(2022, 6, 27), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
  	{'Date': new Date(2022, 7, 3), 'Title': 'Next month event'},
];
var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);
