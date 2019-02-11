# homeassistant-lovelace-birthday-reminder-card
Custom card that helps you remember birthdays and other events that happen once a year on the same date. I made this because I wanted a simple card to remind me of birthdays, without having to install Google calendar.

![Image of birthday-card](https://github.com/erlsta/homeassistant-lovelace-birthday-reminder-card/blob/master/birthday-card.png)

## How to install
1. Copy the script to your local directory (I suggest to place all plugins in a directory "plugins" inside your www-folder and to add a new directory inside this for each custom card - if not: adjust the path to birthday-card.js).
2. Add this to your ui-lovelace.yaml:

```
resources:
  - url: /local/plugins/birthday-card/birthday-card.js?v=1.001
    type: js
```

Place the card in your ui-lovelace.yaml like this:

```
- type: "custom:birthday-card"
  title: "Birthdays"
```

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

### Settings
Change `numberOfDays` to change the number of days ahead to display birthdays. Set this to 365 to display all birthdays for a full year.

You may also translate the text used in the card to your own language, by changing the strings under "String translations".
