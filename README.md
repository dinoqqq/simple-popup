# Simple Modal / Popup (jQuery) 
A simple, clean jQuery modal / popup, works out of the box. When you don't like inline CSS or centering a popup with JS, like me, try it out.<br><br>
[Check out the demo's](https://daankuijsten.github.io/simple-popup/)

## Features
- Flexible and configurable
- Smooth fade in / fade out effect (customizable)
- Center vertically and horizontally with dynamic content (CSS only)
- Escape key closes popup
- Load popup content via "data" attribute on HTML or with JS selector to HTML block
- Optional: don't inject inline CSS with JS

## Browser support
| Chrome | Firefox | Internet Explorer                   | Edge | Safari | Netscape Navigator |
|--------|---------|-------------------------------------|------|--------|--------------------|
| 36+    | 16+     | 9 <sup>(no fade effects)</sup>, 10, 11 | 13+  | 5.1+   | Not supported      |

## Usage
Call the `simplePopup()` function on a jQuery selector and pass in an `options` object if you like.

```javascript
    var options = {
        escapeKey: false,
        fadeInDuration: 1.0
    };

    $("a.open-popup-link").on("click", function(e) {
        e.preventDefault();
        $(this).simplePopup(options);
    });
```

**Option 1: inline text** Open simple text in the popup.

```html
    <a class="open-popup-link" data-content="Hey there!">Click</a>
```

**Option 2: HTML block** Open a specific HTML block as popup content

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

    $("a.open-popup-link").on("click", function(e) {
        e.preventDefault();
        $(this).simplePopup(options);
    });
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
| Option                | Values                 | Default | Description                                                                                                                                    |
|--------------------|------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------|
| type                  | "auto", "data", "html" | "auto"  | **data:** check for a "data-content" attribute on the selector <br>**html:** use a block of HTML in the DOM to show in the popup. Select which block of HTML by setting the option "htmlSelector"<br> **auto:** try "data", try "html" and fail  |
| htmlSelector          | CSS selector           | null    | Select which block of HTML is used as popup content. For example "#popup" or ".popup-content". Works only when `type: html` or `type: auto` with no data attribute set.
| height                | CSS value              | "auto"  | The height of the popup                                                                                                                        |
| width                 | CSS value              | "600px" | The width of the popup                                                                                                                         |
| background            | CSS value              | "#fff"  | The background for the popup                                                                                                                   |
| backdrop              | Number between 0 - 1   | 0.7     | When the number is between 0 and 1, this determines the opacity of the backdrop,  When it has a falsy value, the backdrop is never shown.      |
| backdropBackground    | CSS value              | "#000"  | The background for the backdrop                                                                                                                |
| fadeInDuration        | CSS value              | 0.3     | The fade in duration time in seconds. A number greater than 0.                                                                                 |
| fadeInTimingFunction  | CSS value              | "ease"  | The fade in timing function is a value for the CSS property ["transition-timing-function"](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function). Examples: "ease", "ease-in-out", "steps(5, end)".    |
| fadeOutDuration       | CSS value              | 0.3     | The fade out duration time in seconds. A number greater than 0.                                                                                 |
| fadeOutTimingFunction | CSS value              | "ease"  | The fade out timing function is a value for the CSS property ["transition-timing-function"](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function). Examples: "ease", "ease-in-out", "steps(5, end)".    |
| inlineCss             | true, false            | true    | Inject CSS via JS or not. When you choose `false` here, you need to include `jquery.simple-popup.settings.css`.                                |
| escapeKey             | true, false            | true    | When pressing the escape key, the popup closes                                                                                                 |
| closeCross            | true, false            | true    | Show the closing cross on the top right of the popup or not                                                                                    |

## Callbacks
| Function          | Parameters                                                                                                                                                                                  | Description                                                                                    |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| beforeOpen(html)  | **html**: jQuery object of the popup with id "#simple-popup". Content should be written in it's, child ".simple-popup-content", like this: `html.find(".simple-popup-content").append("");` | This function is called before the popup is going to open and before any fade in/out effects.  |
| afterOpen(html)   | **html**: jQuery object of the popup with id "#simple-popup". Content should be written in it's, child ".simple-popup-content", like this: `html.find(".simple-popup-content").append("");` | This function is called after the popup is opened and after any fade in/out effects.           |
| beforeClose(html) | **html**: jQuery object of the popup with id "#simple-popup". Content should be written in it's, child ".simple-popup-content", like this: `html.find(".simple-popup-content").append("");` | This function is called before the popup is going to close and before any fade in/out effects. |
| afterClose        |                                                                                                                                                                                             | This function is called after the popup is closed and after any fade in/out effects.           |


