# Caleandar v0.1.1
Let me keep the intro brief. It's a lightweight (about `7.5kb` minified at the time of writing) and library-independent calendar script with optional themes. You can add events to the calendar and add functionality on click of the event. That's about the jist of it. Continue reading for instructions on how to use and examples.

## What's New in v0.1.1
I forked from the 2016 version in Aug 2020 to make a few minor changes, including:
* Limiting navigation to a minimum and maximum month.
* Using a `ClickEvent` without removing the href from the link anchor tag.
* Navigating forwards/backwards a full year at a time.
* Allowed `adjuster` argument of `createCalendar()` to accept a Date to set the calendar to a specific date.
	* This could be used to have links within the web page to link to a certain day, with minor changes to the instantiation process.
	* However, it was not actually used, and is not thoroughly tested.

Note that I only tested these features with **theme 2**, so there is no guarantee they work with your own application.

## Installing
Simply download the caleandar.js file and any of the css themes you'd like. Then include a reference to the file(s) in your html:
```
<script type="text/javascript" src="js/caleandar.min.js"></script>
```
plus any of the following optional css files
```
<link rel="stylesheet" href="css/theme1.css"/>
<link rel="stylesheet" href="css/theme2.css"/>
<link rel="stylesheet" href="css/theme3.css"/>
```

## Instantiating
At it's simplest, call the `calendar()` function with the following 3 optional parametars:
```
caleandar(element, events, settings);
```
Where `element` is an HTML element, `events` is an array of event objects and `settings` is an object of settings. Pretty straightforward so far.

### Element
A single HTML element.

#### Examples:
`var element = caleandar(document.querySelector('#foo'));`

`var element = caleandar(document.getElementById('foo'));`

`var element = caleandar(document.getElementsByClassName('bar')[0]);`

or if you are using jQuery:
`var element = caleandar($('#foo'));`

### Events
An array of event objects to be placed on their respective dates on the calendar.

#### Examples:
Using Simple links for events:
```
var events = [
	{'Date': new Date(2016, 6, 1), 'Title': 'Doctor appointment at 3:25pm.'},
	{'Date': new Date(2016, 6, 7), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
	{'Date': new Date(2016, 6, 11), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
];
```
Using anonymous functions to instantiate on click:
```
var events = [
	{'Date': new Date(2016, 6, 1), 'Title': 'Doctor appointment at 3:25pm.', 'Link': function(){console.log('Reminder!');}},
	{'Date': new Date(2016, 6, 7), 'Title': 'New Garfield movie comes out!', 'Link': function(){alert("Better not miss the movie!");}},
	{'Date': new Date(2016, 6, 11), 'Title': '25 year anniversary', 'Link': function(){console.debug(document.getElementById('foo'));}},
];
```

### Settings
Below are all the possible settings attributes with example values.
```
var settings={
		Color: '#999',                    				//(string - color) font color of whole calendar.
		LinkColor: '#333',            						//(string - color) font color of event titles.
		NavShow: true,                						//(bool) show navigation arrows.
		NavShowYear: true,            						//(bool) show navigation arrows for years (only tested in theme 2, doesn't work with NavVertical=true)
		NavVertical: false,           						//(bool) show previous and coming months.
		NavLocation: '#foo',          						//(string - element) where to display navigation, if not in default position.
		DateTimeShow: true,           						//(bool) show current date.
		DatetimeLocation: '',         						//(string - element) where to display previously mentioned date, if not in default position.
		EventClick: '',               						//(function) a function that should instantiate on the click of any event. parameters passed in via data link attribute.
		RemoveAnchorHrefIfEventClickGiven: false, //(bool) true: put <a href=#>; false: put <a href=Link>
		EventTargetWholeDay: false,   						//(bool) clicking on the whole date will trigger event action, as opposed to just clicking on the title.
		DisabledDays: [],             						//(array of numbers) days of the week to be slightly transparent. ie: [0,6] to fade Sunday and Saturday.
		ModelChange: model,           						//(array of objects) new data object to pass into calendar (serving suggestion: passing through only the currently selected month's events if working with large dataset.   
		MinDateMonth: new Date(1900, 0, 1), 		// (Date) minimum allowable (first valid) month
		MaxDateMonth: new Date(2050, 0, 1)  		// (Date) maximum allowable (last valid) month
	}
```
* Remember, when using `new Date(2020, 0, 1)` is January 1st because months start at 0, but days start at 1. Use the first day of the month (third arg is 0) for MinDateMonth/MaxDateMonth.

### CSS Themes
#### Theme 1
```
<link rel="stylesheet" href="css/theme1.css"/>
```
![theme1.css](http://i.imgur.com/MoBMUEa.png)

#### Theme 2
```
<link rel="stylesheet" href="css/theme2.css"/>
```
![theme2.css](http://i.imgur.com/6l7VSIL.png)

#### Theme 3
```
<link rel="stylesheet" href="css/theme3.css"/>
```
![theme3.css](http://i.imgur.com/fsNXVwc.png)
