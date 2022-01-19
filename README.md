# homeassistant-lovelace-birthday-reminder-card
Custom card that helps you remember birthdays and other events that happen once a year on the same date. I made this because I wanted a simple card to remind me of birthdays, without having to install Google calendar.

![Image of birthday-card](https://github.com/erlsta/homeassistant-lovelace-birthday-reminder-card/blob/master/birthday-card.png)

## Version history
| Version | Date        |               |
| :-----: | :---------: | ------------- |
| v1.0    | 2019.02.11  | First version  |
| v1.1    | 2019.02.16  | Fixed age for people whos birthday date has passed in current year|
| v1.2    | 2019.03.10  | <ul><li>*** Breaking change *** setting for `numberofdays` moved to ui-lovelace.yaml. This alows for changing the number of days to show upcoming birthdays without having to edit the js-file (see "How to install").<li><b>Bugfix</b>: fixed a bug that caused an error in the count of days to an upcoming birthday when the birthday is not in the current month</ul>|
| v1.3    | 2022.01.19  | <ul><li>*** Breaking change *** setting birthday list trough yaml moved to ui-lovelace.yaml. This alows for easy and simple creating of the list without having to edit the js-file (see "How to edit birthday list").<li><b>Texts translations</b>: All texts now can be translated trough card config in ui-lovelace.yaml no need to edit js-file anymore.<li><b>Custom dates types</b>: Icon for the date reocord based on the type specified.<li>added localisation for day month display.<li>Code refactoring.</ul>|

## How to install
1. Copy the script (birthday-card.js) to your local directory (I suggest to place all plugins in a directory "plugins" inside your www-folder and to add a new directory inside this for each custom card - if not: adjust the path to birthday-card.js). The file birthday-card.png is not necessary - it's just there so I can display the picture of the card above.
2. Add this to your ui-lovelace.yaml:

```
resources:
  - url: /local/plugins/birthday-card/birthday-card.js?v=1.3.0
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
        ...
```

(or add it as a card to an existing view)

## How to update from previous version
- Copy out your existing birthday list and string translations from the old birthday-card.js into an empty text-file.
- Use the new yaml structure of card config to add list records back.
- Use the new yaml structure of card config to add the translations.
- No need to touch birthday-card.js file anymore

## Options

| Option  | Type        | Default value |               |
| :-----: | :---------: | :---------: | ------------- |
| title    | str  | Birthdays  | Set title for the card |
| numberofdays    | int  | 14  | Set numberofdays to change the number of days ahead to display birthdays. Set this to 365 to display all birthdays for a full year. |
| date_locale    | str  | default (use browser locale)  | Set local representation of the date for the record date, mostly used for month name. [Use BCP 47 Language Tag](https://www.techonthenet.com/js/language_tags.php) |
| events_list  | object        |   |  List of dates with name and type see below for more information about this |
| text_today  | str        | Today  |  Translation of card text. Use it to set your own translation |
| text_tomorrow  | str        | Tomorrow  |  Translation of card text. Use it to set your own translation |
| text_none  | str        | No birthdays in the next  |  Translation of card text. Use it to set your own translation |
| text_days  | str        | days  |  Translation of card text. Use it to set your own translation |
| text_years  | str        | years  |  Translation of card text. Use it to set your own translation |

### events_list object
| Option  | Type        | Default value |               |
| :-----: | :---------: | :---------: | ------------- |
| name    | str  | <b>Required</b>  | Name of the date. ex Adam Smith |
| year    | int  | Optional  | If you don't set this, age will not be displayed. |
| month    | int  | <b>Required</b>  | Month number - 1 to 12 |
| day    | int  | <b>Required</b>  | Day number - 1 to 31 |
| type    | str  | Optional  | Shows icon for the event based on the type specified. Available types are: **b** - birthday, **m** - memorial, **e** - engadgment, **w** - wedding. If not specified, generic calendar icon will be used |

## Examples

```
views:
  - title: "Example"
    cards:
      - type: "custom:birthday-card"
        title: "Birthdays"
        numberofdays: 30
        date_locale: "en-US"
        events_list:
          - name: 'Adam Smith'
            day: 31
            month: 1
            year: 1980
            type: 'b'
            
          - name: 'Jane and Adam Smith'
            day: 6
            month: 10
            year: 2005
            type: 'w'
            
          - name: 'Grandfather'
            day: 3
            month: 4
            year: 1955
            type: 'm'
```


**After adding entries to the list, reload the page where you display your Home Assistant page (usually by holding down command/control and reloading the page - might differ from browser to browser).**
