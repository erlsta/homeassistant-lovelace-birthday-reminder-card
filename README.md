# homeassistant-lovelace-birthday-reminder-card
Custom card that helps you remember birthdays and other events that happen once a year on the same date. I made this because I wanted a simple card to remind me of birthdays, without having to install Google calendar.

![Image of birthday-card](https://github.com/erlsta/homeassistant-lovelace-birthday-reminder-card/blob/master/birthday-card.png)

## Version history
| Version | Date        |               |
| :-----: | :---------: | ------------- |
| v1.0    | 2019.02.11  | First version  |
| v1.1    | 2019.02.16  | Fixed age for people whos birthday date has passed in current year|
| v1.2    | 2019.03.10  | *** BREAKING CHANGES *** setting for 'numberofdays' moved to ui-lovelace.yaml. This alows for changing the number of days to show upcoming birthdays without having to edit the js-file. See "How to install".<br /><b>Bugfix</b>: fixed a bug that caused an error in the count of days to an upcoming birthday when the birthday is not in the current month|

## How to install
1. Copy the script (birthday-card.js) to your local directory (I suggest to place all plugins in a directory "plugins" inside your www-folder and to add a new directory inside this for each custom card - if not: adjust the path to birthday-card.js). The file birthday-card.png is not necessary - it's just there so I can display the picture of the card above.
2. Add this to your ui-lovelace.yaml:

```
resources:
  - url: /local/plugins/birthday-card/birthday-card.js?v=1.001
    type: js
```

Place the card in your ui-lovelace.yaml like this:

```
views:
  - title: "Example"
    cards:
      - type: "custom:birthday-card"
        title: "Birthdays"
        numberofdays: 30
```

(or add it as a card to an existing view)

## How to update from previous version
- Copy out your existing birthday list and string translations from the old birthday-card.js into an empty text-file.
- Replace all text in your existing birthday-card.js file with the new code from GitHub.
- Copy back your old birthday list and string translations into the new birthday-card.js.
- Remember to set 'numberofdays' in ui-lovelace (if not, numberofdays defaults to 14).
- Remember to set a higher version number for the card in resources under ui-lovelace.yaml

## How to edit birthday list

Open the js-file in a text editor. At the start of the file, you will see an array called "birthdayList". This array contains a series of objects. Each of these are one item in the birthday list, with this format:

```
{name:"Name", day:7, month:6, year:1990},
```

Change the name, day, month and year to what suits you.

Copy the line and change the information to add as many birthdays you want to the list. For easy management, I suggest keeping the list in alfabetical order, although this will not make any difference for the function of the card itself.

### Options
`Year` is optional, but without this, age will of course not be displayed.

Add `, s:1` after the year to add a cross symbol after the name (used for people who has passed on). The symbol can be changed by changing the string after `bdDeadSymbol` to another char.

Add `, s:2` after the year to add a heart symbol after the name (used for wedding aniversaries, etc.). The symbol can be changed by changing the string after `bdMarriedSymbol` to another char.

You can only set one of the two (s:1 or s:2).

**Remember to increment the version number every time you edit the birthday list (V=1.002, 1.003, etc.).**
After incrementing the version number, reload the page where you display your Home Assistant page (usually by holding down command/control and reloading the page - might differ from browser to browser).

### Settings in ui-lovelace.yaml
Set `numberofdays` to change the number of days ahead to display birthdays. Set this to 365 to display all birthdays for a full year.

### Settings in the birthday-card.js file
You may also translate the text used in the card to your own language, by changing the strings under "String translations" in birthday-card.js.
