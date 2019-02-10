class BirthdayCard extends HTMLElement {
	set hass(hass) {
		
		
		
		
///// SETTINGS /////////////////////////////////////////////////////////////
		
		
		// Settings //
		
		var numberOfDays = 31; // Number of days from today upcomming birthdays will be displayed
		var bdDeadSymbol = "&#8224;"; // (Symbol for people who have passed on - set «, d:1» in birthday list)
		var bdMarriedSymbol = "&#9829;";
		
		
		// String translations (translate these to your own language) //
		
		var bdTextToday = "Today"; // Today
		var bdTextTomorrow = "Tomorrow"; // Tomorrow
		var bdTextNone = "No birthdays in the next"; // No birthdays during next
		var bdTextDays = "days"; // days
		var bdTextYears = "years"; // years
		var bdTextIn = "in"; // in
		
		
///// BIRTHDAY REGISTRY ////////////////////////////////////////////////////
	
		
		var birthdayList=[
			{name:"Adam", day:17, month:2, year:1990},
			{name:"Amanda", day:2, month:3, year:1967},
			{name:"Grandfather", day:16, month:2, year:1927, s:1},
			{name:"Gladys", day:10, month:2, year:1967},
			{name:"Peter", day:7, month:3, year:1967},
			{name:"Wedding aniversary", day:5, month:3, year:2003, s:2},
		];
		
		
///// DO NOT EDIT BELOW THIS LINE //////////////////////////////////////////
		
		
		if (!this.content) {
			const card = document.createElement('ha-card');
			var tittel = this.config.title;
			if (tittel) {
				card.header = tittel;
			} else {
				card.header = "Birthdays";
			}
			this.content = document.createElement('div');
			this.content.style.padding = '0 16px 16px';
			card.appendChild(this.content);
			this.appendChild(card);
		}
		
		const entityId = this.config.entity;
		const state = hass.states[entityId];
		const stateStr = state ? state.state : 'unavailable';
		
		
		
		var currentMonth = new Date().getMonth() + 1;
		var currentDay = new Date().getDate();
		var currentYear = new Date().getFullYear();
		var currentDayTS = new Date(currentYear, currentMonth, currentDay).getTime();
		var oneDay = 24*60*60*1000;
		
		
		for(var i = 0; i < birthdayList.length; i++) {
			var obj = birthdayList[i];
			
			if ( (obj.month < currentMonth) || ( (obj.month == currentMonth) && (obj.day < currentDay) ) ) {
				obj.ts = new Date((currentYear+1), obj.month, obj.day).getTime();
			} else {
				obj.ts = new Date(currentYear, obj.month, obj.day).getTime();
			}
			
			obj.diff = Math.round( Math.abs( (currentDayTS - obj.ts)/(oneDay) ) );
			
			if ( obj.diff > numberOfDays) { obj.ts = 0; }
		}
		
		var sortertListe = birthdayList.sort((a, b) => (a.ts > b.ts) ? 1 : ((b.ts > a.ts) ? -1 : 0)); 
		var birthdayToday = "";
		var birthdayNext = "";
		
		for(var i = 0; i < sortertListe.length; i++) {
			
			var obj = sortertListe[i];
			
			if (obj.year > 0) {
				var age = "(" + (currentYear - obj.year) + " " + bdTextYears + ")";
			} else {
				var age = "";
			}
			
			var bdSymbol = "";
			if (obj.s == 1) { bdSymbol = " " + bdDeadSymbol; }
			if (obj.s == 2) { bdSymbol = " " + bdMarriedSymbol; }
			
			if ((obj.month == currentMonth) && (obj.day == currentDay)) {
				
				birthdayToday = birthdayToday + "<div class='bd-wrapper bd-today'><ha-icon class='ha-icon entity on' icon='mdi:crown'></ha-icon><div class='bd-name'>" + obj.name + " " + age + bdSymbol + "</div><div class='bd-when'>" + bdTextToday + "</div></div>";
				
			} else if (obj.ts != 0) {
				
				var dbExpr = obj.diff == 1 ? bdTextTomorrow : bdTextIn + " " + obj.diff + " " + bdTextDays;
				birthdayNext = birthdayNext + "<div class='bd-wrapper'><ha-icon class='ha-icon entity' icon='mdi:calendar-clock'></ha-icon><div class='bd-name'>" + obj.name + " " + age + bdSymbol + "</div><div class='bd-when'>" + dbExpr + " (" + obj.day + "." + obj.month + ")</div></div>";
				
			}
		}
		
		
		var cardHtmlStyle = `
		<style>
			.bd-wrapper {
				padding: 5px;
				margin-bottom: 5px;
			}
			.bd-wrapper:last-child {
				OFFborder-bottom: none;
			}
			.bd-divider {
				height: 1px;
				border-bottom: 1px solid rgba(127, 127, 127, 0.7);
				margin-bottom: 5px;
			}
			.bd-today {
				font-weight: bold;
				OFFborder-bottom: 1px solid;
			}
			.bd-wrapper .ha-icon {
				display: inline-block;
				height: 20px;
				width: 20px;
				margin-left: 5px;
				margin-right: 17px;
				color: var(--paper-item-icon-color);
			}
			.bd-wrapper .ha-icon.on {
				margin-left: 5px;
				margin-right: 17px;
				color: #feb13d;
			}
			.bd-name {
				display: inline-block;
				padding-left: 10px;
				padding-top: 2px;
			}
			.bd-none {
				color: var(--paper-item-icon-color);
			}
			.bd-when {
				display: inline-block;
				float: right;
				font-size: smaller;
				padding-top: 3px;
			}
		</style>
		`;
		
		if (!birthdayToday && !birthdayNext) {
			var cardHtmlContent = "<div class='bd-none'>" + bdTextNone + " " + numberOfDays + " " + bdTextDays + "</div>";
		} else if (!birthdayToday) {
			var cardHtmlContent = birthdayNext;
		} else if (!birthdayNext) {
			var cardHtmlContent = birthdayToday;
		} else {
			var cardHtmlContent = birthdayToday + "<div class='bd-divider'></div>" + birthdayNext;
		}
		
		this.content.innerHTML = cardHtmlStyle + cardHtmlContent;
		
	}
	
	
	
	setConfig(config) {
		this.config = config;
	}
	
// The height of your card. Home Assistant uses this to automatically distribute all cards over the available columns.
	getCardSize() {
		return 3;
	}
}

customElements.define('birthday-card', BirthdayCard);
