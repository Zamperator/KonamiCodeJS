Do you remember the famous Konami code that made virtual life much easier in various Konami games back in the days of 
the Nintendo Entertainment System (NES - for the first time in 'Gradius') made virtual life in various Konami games 
much easier?

↑ ↑ ↓ ↓ ← → ← → B A

The inventor of the Konami Code, Kazuhisa Hashimoto, passed away in February 2020 at the age of just 61.
In his memory, here is a small Easter Egg script that allows you to enter codes on your own website
can execute any event.

You can also use the script for other events (see examples). By the way, you can find an example of how the script
can work on [gog.com](gog.com) - just enter the Konami code. Of course, this is not the script from this repo.

Frameworks such as jQuery are not required.

### Initialisation
```html
<script src="path/to/script.js"></script>
```

### Examples
```javascript
// The Konami Code
KonamiCode.add('konami', () => {
// Do something
});

// Add custom code e.g. doom invulnerability
KonamiCode.add('iddqd', () => {
// Do something
});

// Add costume code e.g. doom all weapons and items
KonamiCode.add('idkfa', () => {
// Do something
});
[extend-copy.js](..%2Fextend-copy%2Fextend-copy.js)
// Custom code line
KonamiCode.add('something something', () => {
// Do something
});

// Custom code segment: key input sequence
KonamiCode.add(['up', 'down', 'left', 'right'], () => {
// Do something
});
```