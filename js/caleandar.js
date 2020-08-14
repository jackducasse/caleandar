/*
	Author: Jack Ducasse;
	Modified by: Parker Link;
	Version: 0.1.1;
	(◠‿◠✿)
*/
var Calendar = function(model, options, date){
	// Default Values
	this.Options = {
		Color: '',
		LinkColor: '',
		NavShow: true,
		NavShowYear: true,
		NavVertical: false,
		NavLocation: '',
		DateTimeShow: true,
		DatetimeLocation: '',
		EventClick: '',
		RemoveAnchorHrefIfEventClickGiven: false,	// true: put <a href=#>; false: put <a href=Link>
		EventTargetWholeDay: false,
		DisabledDays: [],
		ModelChange: model,
		MinDateMonth: new Date(1900, 0, 1), 		// minimum allowable
		MaxDateMonth: new Date(2050, 0, 1),			// maximum allowable
		HideHover: false,
		MakeEachCellAnchor: false
	};
	// Overwriting default values
	for(var key in options){
		this.Options[key] = typeof options[key]=='string'?options[key].toLowerCase():options[key];
	}

	model?this.Model=model:this.Model={};
	this.Today = new Date();

	this.Selected = this.Today
	this.Today.Month = this.Today.getMonth();
	this.Today.Year = this.Today.getFullYear();
	if(date){this.Selected = date}
	this.Selected.Month = this.Selected.getMonth();
	this.Selected.Year = this.Selected.getFullYear();

	this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
	this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
	this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();

	this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
	if(this.Selected.Month==0){this.Prev = new Date(this.Selected.Year-1, 11, 1);}
	this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
};

function createCalendar(calendar, element, adjuster){
	// adjuster can be an int (to change the date by a number of months), 
	if(typeof adjuster === 'number'){
		var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
	}else if(adjuster instanceof Date){
		var newDate = new Date(adjuster.valueOf());
	}

	if(typeof adjuster !== 'undefined'){
		if(newDate <= calendar.Options.MaxDateMonth && newDate >= calendar.Options.MinDateMonth){
			calendar = new Calendar(calendar.Model, calendar.Options, newDate);
		}else{
			// calendar date should not change, just recreate the current version
			calendar = new Calendar(calendar.Model, calendar.Options, calendar.Selected);
		}
		element.innerHTML = '';
	}else{
		// First time creating calendar, not recreating it
		for(var key in calendar.Options){
			typeof calendar.Options[key] != 'function' && typeof calendar.Options[key] != 'object' && calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
		}
	}

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	function AddSidebar(){
		var sidebar = document.createElement('div');
		sidebar.className += 'cld-sidebar';

		var monthList = document.createElement('ul');
		monthList.className += 'cld-monthList';

		for(var i = 0; i < months.length - 3; i++){
			var x = document.createElement('li');
			x.className += 'cld-month';
			var n = i - (4 - calendar.Selected.Month);
			// Account for overflowing month values
			if(n<0){n+=12;}
			else if(n>11){n-=12;}
			// Add Appropriate Class
			if(i==0){
				x.className += ' cld-rwd cld-nav';
				x.addEventListener('click', function(){
					typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
					createCalendar(calendar, element, -1);});
				x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
			}
			else if(i==months.length - 4){
				x.className += ' cld-fwd cld-nav';
				x.addEventListener('click', function(){
					typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
					createCalendar(calendar, element, 1);} );
				x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
			}
			else{
				if(i < 4){x.className += ' cld-pre';}
				else if(i > 4){x.className += ' cld-post';}
				else{x.className += ' cld-curr';}

				//prevent losing var adj value (for whatever reason that is happening)
				(function () {
					var adj = (i-4);
					//x.addEventListener('click', function(){createCalendar(calendar, element, adj);console.log('kk', adj);} );
					x.addEventListener('click', function(){
						typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
						createCalendar(calendar, element, adj);} );
					x.setAttribute('style', 'opacity:' + (1 - Math.abs(adj)/4));
					x.innerHTML += months[n].substr(0,3);
				}()); // immediate invocation

				if(n==0){
					var y = document.createElement('li');
					y.className += 'cld-year';
					if(i<5){
						y.innerHTML += calendar.Selected.Year;
					}else{
						y.innerHTML += calendar.Selected.Year + 1;
					}
					monthList.appendChild(y);
				}
			}
			monthList.appendChild(x);
		}
		sidebar.appendChild(monthList);
		if(calendar.Options.NavLocation){
			document.getElementById(calendar.Options.NavLocation).innerHTML = "";
			document.getElementById(calendar.Options.NavLocation).appendChild(sidebar);
		}
		else{element.appendChild(sidebar);}
	}

	var mainSection = document.createElement('div');
	mainSection.className += "cld-main";

	function AddDateTime(){ // adds DateTime banner on the top (with current month, year, and nav buttons)
			var datetime = document.createElement('div');
			datetime.className += "cld-datetime";
			if(calendar.Options.NavShow && !calendar.Options.NavVertical){
				if (calendar.Options.NavShowYear){
					var rwdYear = document.createElement('div');
					rwdYear.className += " cld-rwd-year cld-rwd cld-nav";
					rwdYear.addEventListener('click', function(){createCalendar(calendar, element, -12);} );
					//rwdYear.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
					rwdYear.innerHTML = '<svg height="15" width="15" viewBox="0 0 120 100" fill="rgba(0,0,0,0.5)"><polyline points="60,0 0,50 60,100"></polyline><polyline points="120,0 60,50 120,100"></polyline></svg>';
					datetime.appendChild(rwdYear);
				}

				var rwd = document.createElement('div');
				rwd.className += " cld-rwd cld-nav";
				rwd.addEventListener('click', function(){createCalendar(calendar, element, -1);} );
				rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
				datetime.appendChild(rwd);

				
			}
			var today = document.createElement('div');
			today.className += ' today';
			today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
			datetime.appendChild(today);
			if(calendar.Options.NavShow && !calendar.Options.NavVertical){
				var fwd = document.createElement('div');
				fwd.className += " cld-fwd cld-nav";
				fwd.addEventListener('click', function(){createCalendar(calendar, element, 1);} );
				fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
				datetime.appendChild(fwd);

				if(calendar.Options.NavShowYear){
					var fwdYear = document.createElement('div');
					fwdYear.className += " cld-fwd-year cld-fwd cld-nav";
					fwdYear.addEventListener('click', function(){createCalendar(calendar, element, 12);} );
					fwdYear.innerHTML = '<svg height="15" width="15" viewBox="0 0 120 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 60,50 0,100"></polyline><polyline points="60,0 120,50 60,100"></polyline></svg>';
					datetime.appendChild(fwdYear);
				}
			}
			if(calendar.Options.DatetimeLocation){
				document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
				document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
			}
			else{mainSection.appendChild(datetime);}
	}

	function AddLabels(){
		var labels = document.createElement('ul');
		labels.className = 'cld-labels';
		var labelsList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		for(var i = 0; i < labelsList.length; i++){
			var label = document.createElement('li');
			label.className += "cld-label";
			label.innerHTML = labelsList[i];
			labels.appendChild(label);
		}
		mainSection.appendChild(labels);
	}
	function AddDays(){
		// Create Number Element
		function DayNumber(n){
			var number = document.createElement('p');
			number.className += "cld-number";
			number.innerHTML += n;
			return number;
		}
		if (calendar.Options.MakeEachCellAnchor){
			var days = document.createElement('div');
			var dayType = 'a';
		}else{
			var days = document.createElement('ul');
			var dayType = 'li';
		}
		days.className += "cld-days";
		// Previous Month's Days
		for(var i = 0; i < (calendar.Selected.FirstDay); i++){
			var day = document.createElement(dayType);
			day.className += "cld-day prevMonth";
			//Disabled Days
			var d = i%7;
			for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
				if(d==calendar.Options.DisabledDays[q]){
					day.className += " disableDay";
				}
			}

			var number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i+1));
			day.appendChild(number);

			days.appendChild(day);
		}
		// Current Month's Days
		for(var i = 0; i < calendar.Selected.Days; i++){
			var day = document.createElement(dayType);
			day.className += "cld-day currMonth";
			//Disabled Days
			var d = (i + calendar.Selected.FirstDay)%7;
			for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
				if(d==calendar.Options.DisabledDays[q]){
					day.className += " disableDay";
				}
			}
			var number = DayNumber(i+1);
			// Check Date against Event Dates
			for(var n = 0; n < calendar.Model.length; n++){
				var evDate = calendar.Model[n].Date;
				var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));
				if(evDate.getTime() == toDate.getTime()){
					number.className += " eventday";
					var title = document.createElement('span'); // title is the floating hover text
					title.className += "cld-title";
					if (calendar.Options.MakeEachCellAnchor) {
						day.setAttribute('href', calendar.Model[n].Link);
					}
					if (calendar.Options.HideHover) {
						// Hide the hover tooltip, as desired
						title.style.display = "none";
					}
					if(typeof calendar.Model[n].Link == 'function' || calendar.Options.EventClick){
						var a = document.createElement('a');
						if (calendar.Options.RemoveAnchorHrefIfEventClickGiven) {
							a.setAttribute('href', '#');
						}else{
							a.setAttribute('href', calendar.Model[n].Link);
						}
						a.innerHTML += calendar.Model[n].Title;
						if(calendar.Options.EventClick){
							var z = calendar.Model[n].Link;
							if(typeof calendar.Model[n].Link != 'string'){
									a.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
									if(calendar.Options.EventTargetWholeDay){
										day.className += " clickable";
										day.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
									}
							}else{
								a.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
								if(calendar.Options.EventTargetWholeDay){
									day.className += " clickable";
									day.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
								}
							}
						}else{
							a.addEventListener('click', calendar.Model[n].Link);
							if(calendar.Options.EventTargetWholeDay){
								day.className += " clickable";
								day.addEventListener('click', calendar.Model[n].Link);
							}
						}
						title.appendChild(a);
					}else{
						title.innerHTML += '<a href="' + calendar.Model[n].Link + '">' + calendar.Model[n].Title + '</a>';
					}
					number.appendChild(title);
				}
			}
			day.appendChild(number);
			// If Today..
			if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
				day.className += " today";
			}
			days.appendChild(day);
		}
		// Next Month's Days
		// Always same amount of days in calander
		var extraDays = 13;
		if(days.children.length>35){extraDays = 6;}
		else if(days.children.length<29){extraDays = 20;}

		for(var i = 0; i < (extraDays - calendar.Selected.LastDay); i++){
			var day = document.createElement(dayType);
			day.className += "cld-day nextMonth";
			//Disabled Days
			var d = (i + calendar.Selected.LastDay + 1)%7;
			for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
				if(d==calendar.Options.DisabledDays[q]){
					day.className += " disableDay";
				}
			}

			var number = DayNumber(i+1);
			day.appendChild(number);

			days.appendChild(day);
		}
		mainSection.appendChild(days);
	}
	if(calendar.Options.Color){
		mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
	}
	if(calendar.Options.LinkColor){
		mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
	}
	element.appendChild(mainSection);

	if(calendar.Options.NavShow && calendar.Options.NavVertical){
		AddSidebar();
	}
	if(calendar.Options.DateTimeShow){
		AddDateTime();
	}
	AddLabels();
	AddDays();
}

function caleandar(el, data, settings){
	var obj = new Calendar(data, settings);
	createCalendar(obj, el);
}
