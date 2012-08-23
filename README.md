[![build status](https://secure.travis-ci.org/sazzer/express-yui3.png)](http://travis-ci.org/sazzer/express-yui3)
# Express-yui3

Making configuration of YUI3 modules painless

## Goals
* Simple
* Easy to use
* Fast
* Remove duplication of configuration required for YUI3 modules

## What doesn't it do yet
So far the loader that is generated is incredably simple. So simple in fact that it doesn't do hardly anything. Features currently missing that will be added as and when I get round to it are:
* Support for language files
* Support for widget assets
* Support for comboing of modules
* Support for rollups
* Support for minifiction of modules
* Support for css modules
* Support for submodules
* More testing

## Examples

```javascript
var express = require("express"),
    app = express.createServer(),
    expressYui3 = require("express-yui3");

app.configure(function() {
    // Standard Express configuration options
    app.use("/yui3", expressYui3.handler(__dirname + "/yui3"));
    // Standard Express configuration options
});
```

This configures up an Express HTTP server, and serves up the YUI3 modules on the "/yui3" route. This then provides a Javascript file at "/yui3/loader" that gives the YUI3 loader configuration to locate all of the modules that were automatically discovered in the directory __dirname + "/yui3". 

The Javascript that is written for the loader will look as follows:
```javascript
var YUI_config = YUI_config || {};
YUI_config.groups = YUI_config.groups || {};
YUI_config.groups["express-yui3"] = {
    "base": "/yui3/modules",
    "modules": {
        // YUI3 Module configuration goes here.
    }
}
```

This will create a global YUI_config object if it doesn't already exist. Then create a YUI_config.groups object if that doesn't already exist. It will then create a group entry called "express-yui3" with the configuration of this group of modules.


## Using from the browser

Using the above configuration for Express, you can use your modules in a browser by simply including YUI3 as normal, and then adding a script tag to include the loader:
```html
<script type="text/javascript" src="http://localhost:3000/yui3/loader"> </script>
```

This will then set up the YUI_config variable as described above so you can use YUI3 like normal and have all of your modules available to you.

# Developed By
* Graham Cox

