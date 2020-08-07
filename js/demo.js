var events = [
	{'Date': new Date(2016, 6, 7), 'Title': 'Doctor appointment at 3:25pm.'},
	{'Date': new Date(2016, 6, 18), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
	{'Date': new Date(2016, 6, 27), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
];


var calendarSettings = {
	//Color: '#999',											//(string - color) font color of whole calendar.
	//LinkColor: '#f79838',										//(string - color) font color of event titles. (prig:333)
	EventClick: function(link) {window.location.href=link;},	//(function) a function that should instantiate on the click of any event. parameters passed in via data link attribute.
	EventTargetWholeDay: true,									//(bool) clicking on the whole date will trigger event action, as opposed to just clicking on the title.
	DisabledDays: [0, 6],										//(array of numbers) days of the week to be slightly transparent. ie: [0,6] to fade Sunday and Saturday.

	MinDateMonth: new Date(2012, 11, 1),						// minimum allowable
	MaxDateMonth: new Date() 									// maximum allowable (use today)

}

var element = document.getElementById('caleandar');
caleandar(element, events, calendarSettings);
