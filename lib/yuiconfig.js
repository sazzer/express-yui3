/**
 * This file contains methods for outputting YUI3 Config blocks to be used by the YUI3 loader to load modules
 */
 
 /**
  * Convert an array of module definitions as supplied by the module loader functions into
  * an object as expected by the YUI3 loader
  * @param modules An array of  modules to convert
  * @return An object in the form expected by the YUI3 loader
  */
function moduleConfig(modules) {
    var result = {};
    for (var i in modules) {
        var module = modules[i];
        var relativePath = module.files.module.substring(module.files.base.length);
        result[module.name] = {
            path: relativePath,
            requires: module.options.requires
        };   
    }
    return result;
}

exports.moduleConfig = moduleConfig;