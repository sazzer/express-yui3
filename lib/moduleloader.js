var fs = require("fs"),
    path = require("path");

/**
 * Load all of the modules that are found under the given root directory and call the callback function for each one in turn
 * Callback is a method that takes a single parameter of the module details
 * @param root The root directory to find modules under
 * @param callback The callback function
 */
function loadModules(root, callback) {
    var module = {
    };
    callback(module);
}

/**
 * Load the module from the specific javascript file, calling the callback function when it is loaded
 * @param file The file to load
 * @param callback The callback function
 */
function loadModule(file, callback) {
    console.log("Loading file: " + file);
    fs.readFile(file, "utf8", function(err, data) {
        if (err) {
            throw new Error(err);
        }

        var YUI = {
            add: function(name, mod, version, options) {
                console.log("Adding module: " + name);
                var module = {
                    name: name,
                    version: version,
                    options: options,
                    files: {
                        root: path.dirname(file),
                        module: file,
                    }
                };
                callback(module);
            }
        };
        
        eval(data);
    });    
}

exports.loadModules = loadModules;
exports.loadModule = loadModule;