/**
 * This file contains methods for loading module details from the filesystem
 */
var fs = require("fs"),
    path = require("path"),
    async = require("async");

/**
 * Load all of the modules that are found under the given root directory and call the callback function for each one in turn
 * Callback is a method that takes a single parameter of the module details
 * @param root The root directory to find modules under
 * @param callback The callback function
 * @param base The base directory. If not specified then defaults to the root directory
 */
function loadModules(root, callback, base) {
    base = base || root;
    fs.readdir(root, function(err, files) {
        if (err) {
            throw new Error(err);
        }
        async.forEach(files, function(f, next) {
            // Filter out the lang and assets folders as they are special
            if (f !== "lang" && f !== "assets") {
                var realFile = path.join(root, f);
                fs.stat(realFile, function(err, stats) {
                    if (err) {
                        throw new Error(err);
                    }
                    if (stats.isDirectory()) {
                        loadModules(realFile, callback, base);
                    }
                    else if (stats.isFile() && path.extname(f) == ".js") {
                        loadModule(realFile, base, callback);
                    }
                });
            }
            next();
        });
    });
}

/**
 * Load the module from the specific javascript file, calling the callback function when it is loaded
 * @param file The file to load
 * @param base The base directory the modules are laoded from
 * @param callback The callback function
 */
function loadModule(file, base, callback) {
    fs.readFile(file, "utf8", function(err, data) {
        if (err) {
            throw new Error(err);
        }

        var YUI = {
            add: function(name, mod, version, options) {
                var module = {
                    name: name,
                    version: version,
                    options: options,
                    files: {
                        base: base,
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