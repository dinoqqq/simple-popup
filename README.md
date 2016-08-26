# Simple Popup (jQuery) 
A simple, clean popup written with jQuery, works out of the box. When you don't like inline CSS or centering a popup with JS, like me, try it out. A popup filled with data from a data attribute on HTML tag also supported.

## Features
- Flexible and configurable
- Smooth fade in / fade out effect
- Center vertically and horizontally with dynamic content (CSS only)
- Escape key closes popup
- Load popup content via "data" attribute on HTML or with JS selector to HTML
- Optional: don't inject inline CSS with JS

## Usage
Call the `simpleProduct()` function on a jQuery selector and pass in an `options` object if you like.

```javascript
    var options = {
        escapeKey: false,
        closeCross: false
    };

    $('a.open-popup-link').simpleProduct(options);
```

**Option 1 (inline text)**
Open simple text in the popup.

```html
    <a class="open-popup-link" data-content="Hey there!">Click</a>
```

**Option 2 (HTML block)**
Open simple text in the popup.

```html
    <a class="open-popup-link">Click</a>
    <div id="popup">
        <p>Hey there!</p>
    </div>
```

```javascript
    var options = {
        type: "html",
        htmlSelector: "#popup",
    };

    $('a.open-popup-link').simpleProduct(options);
```

## Installation
Include JS and CSS: [include jQuery](https://jquery.com/download/), `jquery.simple-popup.js` and `jquery.simple-popup.css`.

```html
    <script src="jquery.js"></script>
    <script src="jquery.simple-popup.min.js"></script>

    <link href="jquery.simple-popup.css" rel="stylesheet" type="text/css" />
```

When you don't like CSS to be injected with JS, make sure to set `inlineCss: false` in your options and add the following CSS (config) file.

```html
    <link href="jquery.simple-popup.settings.css" rel="stylesheet" type="text/css" />
```

## Options
| Option             | Values                 | Default | Description                                                                                                                                    |
|--------------------|------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------|
| type               | "auto", "data", "html" | "auto"  | **data:** check for a "data-content" attribute on the selector <br>**html:** use a block of HTML in the DOM to show in the popup. Select which block of HTML by setting the option "htmlSelector"<br> **auto:** try "data", try "html" and fail  |
| htmlSelector       | CSS selector           | null    | Select which block of HTML is used as popup content. For example "#popup" or ".popup-content". Works only when `type: html` or `type: auto` with no data attribute set.
| height             | CSS value              | "auto"  | The height of the popup                                                                                                                        |
| width              | CSS value              | "600px" | The width of the popup                                                                                                                         |
| background         | CSS value              | "#fff"  | The background for the popup                                                                                                                   |
| backdrop           | Number between 0 - 1   | 0.7     | When the number is between 0 and 1, this determines the opacity of the backdrop,  When it has a falsy value, the backdrop is never shown.      |
| backdropBackground | CSS value              | "#000"  | The background for the backdrop                                                                                                                |
| inlineCss          | true, false            | true    | Inject CSS via JS or not. When you choose `false` here, you need to include `jquery.simple-popup.settings.css`.                                |
| escapeKey          | true, false            | true    | When pressing the escape key, the popup closes                                                                                                 |
| closeCross         | true, false            | true    | Show the closing cross on the top right of the popup or not                                                                                    |
