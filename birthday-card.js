console.info(`%c Birthday card \n%c Version: ${'1.3.0'} `, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');

class BirthdayCard extends HTMLElement {

	setConfig(config) {
		if (!config) {
			throw new Error('Card config incorrect');
		}
		this._config = config;
		this._birthdayList = [];
		this._bdIcons = {'b':'mdi:cake', 'm':'mdi:cross', 'e':'mdi:ring', 'w':'mdi:human-male-female', 'misc':'mdi:calendar-blank-outline' } //set icons for event type: b - birthday, m - memorial, e - engadgment, w - wedding, misc - when type is missing or not in the array  
		this._datelocale = config.date_locale ? config.date_locale : 'default'; // years
		this._bdTextToday = config.text_today ? config.text_today : 'Today'; // Today
		this._bdTextTomorrow = config.text_tomorrow ? config.text_tomorrow : 'Tomorrow'; // Tomorrow
		this._bdTextNone = config.text_none ? config.text_none : 'No birthdays in the next'; // No birthdays during next
		this._bdTextDays = config.text_days ? config.text_days : 'days'; // days
		this._bdTextYears = config.text_years ? config.text_years : 'years'; // years
		
		this.renderCard();
	}

	set hass(hass) {
		this._hass = hass;
	}

	async renderCard() {
		const config = this._config;
		
		if (window.loadCardHelpers) {
		  this.helpers = await window.loadCardHelpers();
		}
		
		// Create the card
		if (!this.content) {
			const card = document.createElement('ha-card');
			card.header = config.title ? config.title : "Birthdays"; // Card title from ui-lovelace.yaml - Defaults to Birthdays
			this.content = document.createElement('div');
			this.content.style.padding = '0 16px 16px';
			card.appendChild(this.content);
			this.appendChild(card);
		}
		
		const entityId = config.entity;
		const state = this._hass.states[entityId];
		const stateStr = state ? state.state : 'unavailable';
		const numberOfDays = config.numberofdays ? config.numberofdays : 14; //Number of days from today upcomming birthdays will be displayed - default 14
		var events_list = config.events_list;
		
		if (config && Array.isArray(events_list) ) {
			events_list.forEach((event) => {
				this._birthdayList.push({
					'name': event.name,
					'day': event.day,
					'month': event.month,
					'year': event.year ? event.year : 0,
					'icon': event.type ? this._bdIcons[event.type] : this._bdIcons.misc,
					'type': event.type
				});
			});
		}
		
		var current = new Date();
		var currentMonth = current.getMonth();
		var currentDay = current.getDate();
		var currentYear = current.getFullYear();
		var currentDayTS = new Date(currentYear, currentMonth, currentDay).getTime();
		var oneDay = 24*60*60*1000;
		
		
		for(var i = 0; i < this._birthdayList.length; i++) {
			var obj = this._birthdayList[i];
			
			if ( ((obj.month-1) < currentMonth) || ( ((obj.month-1) == currentMonth) && (obj.day < currentDay) ) ) {
				// Birthday passed in current year - add one year to throw date to next birthday
				obj.ts = new Date((currentYear+1), (obj.month-1), obj.day).getTime();
				obj.aPlus = 1;
			} else {
				// Birthday to come current year
				obj.ts = new Date(currentYear, (obj.month-1), obj.day).getTime();
				obj.aPlus = 0;
			}
			
			obj.diff = Math.round( Math.abs( (currentDayTS - obj.ts)/(oneDay) ) );
			
			if ( obj.diff > numberOfDays) { obj.ts = 0; }
		}
		
		var sortertListe = this._birthdayList.sort((a, b) => (a.ts > b.ts) ? 1 : ((b.ts > a.ts) ? -1 : 0)); 
		var birthdayToday = "";
		var birthdayNext = "";
		
		for(var i = 0; i < sortertListe.length; i++) {
			
			var obj = sortertListe[i];
			
			if (obj.year > 0) {
				var age = "(" + (currentYear - obj.year + obj.aPlus) + " " + this._bdTextYears + ")";
			} else {
				var age = "";
			}
			
			var bdTodaySymbol = (obj.type == 'm') ? 'mdi:candle' : 'mdi:party-popper';
			var bdDate = Intl.DateTimeFormat(this._datelocale, { month: 'short', day: 'numeric' }).format(new Date(currentYear, obj.month-1, obj.day));
				
			if (((obj.month-1) == currentMonth) && (obj.day == currentDay)) {
				
				birthdayToday = birthdayToday + "<div class='bd-wrapper bd-today'><ha-icon class='ha-icon entity on' icon='" + bdTodaySymbol + "'></ha-icon><div class='bd-name'>" + obj.name + " " + age + "</div><div class='bd-when'>" + this._bdTextToday + "</div></div>";
				
			} else if (obj.ts != 0) {
				
				var dbExpr = obj.diff == 1 ? this._bdTextTomorrow  : obj.diff + " " + this._bdTextDays;
				birthdayNext = birthdayNext + "<div class='bd-wrapper'><ha-icon class='ha-icon entity' icon='" + obj.icon + "'></ha-icon><div class='bd-name'>" + obj.name + " " + age + "</div><div class='bd-when'>" + dbExpr + " ( " + bdDate + " )</div></div>";
				
			}
		}
		
		if (!birthdayToday && !birthdayNext) {
			var cardHtmlContent = "<div class='bd-none'>" + this._bdTextNone + " " + numberOfDays + " " + this._bdTextDays + "</div>";
		} else if (!birthdayToday) {
			var cardHtmlContent = birthdayNext;
		} else if (!birthdayNext) {
			var cardHtmlContent = birthdayToday;
		} else {
			var cardHtmlContent = birthdayToday + "<div class='bd-divider'></div>" + birthdayNext;
		}
		
		this.content.innerHTML = this.style() + cardHtmlContent;		
		
	}

	
	//set card style
	style() {	
		return `
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
				margin-right: 5px;
				color: var(--paper-item-icon-color);
			}
			.bd-wrapper .ha-icon.on {
				margin-left: 5px;
				margin-right: 5px;
				color: var(--paper-item-icon-active-color);
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
	}
	
	
// The height of your card. Home Assistant uses this to automatically distribute all cards over the available columns.
	getCardSize() {
		return 3;
	}
}

customElements.define('birthday-card', BirthdayCard);
