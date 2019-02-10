# homeassistant-lovelace-birthday-reminder-card
Custom card that helps you remember birthdays and other events that happen once a year on the same date.

## How to install
1. Copy the script to your local directory (I suggest to place all plugins in a directory 'plugins' and to add a new directory inside this for each custom card - if not: adjust the path to birthday-card.js).
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

(to come)

Remember to increment the version number every time you edit the birthday list (V=1.002, 1.003, etc.).
