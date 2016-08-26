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
        "escapeKey": false,
        "closeCross": false
    };

    $('a.open-popup-link').simpleProduct(options);
```

## Installation
Include javascript: jQuery and jquery.simple-popup.js
    <script src="jquery.js"></script>
    <script src="jquery.simple-popup.min.js"></script>

Include CSS: 
    <link href="jquery.simple-popup.css" rel="stylesheet" type="text/css" />

When you don't like CSS to be injected with JS, make sure to set `inlineCss: false` in your options and add the following (config) file.
    <link href="jquery.simple-popup.settings.css" rel="stylesheet" type="text/css" />

## Options
| Option             | Values                 | Default | Description                                                                                                                                    |
|--------------------|------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------|
| type               | "auto", "data", "html" | "auto"  | data: check for a "data-content" attribute on the selector html: also option "htmlSelector" must be set auto: try "data", try "html" and fail  |
| height             | CSS value              | "auto"  | The height of the popup                                                                                                                        |
| width              | CSS value              | "600px" | The width of the popup                                                                                                                         |
| background         | CSS value              | "#fff"  | The background for the popup                                                                                                                   |
| backdrop           | Number between 0 - 1   | 0.7     | When the number is between 0 and 1, this determines the opacity of the backdrop,  When it has a falsy value, the backdrop is never shown.      |
| backdropBackground | CSS value              | "#000"  | The background for the backdrop                                                                                                                |
| inlineCss          | true, false            | true    | Inject CSS via JS or not. When you choose `false` here, you need to include `jquery.simple-popup.settings.css`.                                |
| escapeKey          | true, false            | true    | When pressing the escape key, the popup closes                                                                                                 |
| closeCross         | true, false            | true    | Show the closing cross on the top right of the popup or not                                                                                    |
