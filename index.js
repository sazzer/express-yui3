/**
 * Main entry point to the module
 */
 
 var moduleLoader = require("./lib/moduleloader"),
     yuiConfig = require("./lib/yuiconfig"),
     beeline = require("beeline");

/**
 * Write the Javascript file that corresponds to the YUI3 loader configuration for this group.
 * This loader configuration sets up a YUI_config object if it doesn't already exist, containing
 * the details of a new group that contains all the modules we are serving
 * @param res The response to write to
 * @param modules The array of modules to send
 * @param options Any options to the handler
 */
function sendLoader(res, modules, options) {
    var conf = yuiConfig.moduleConfig(modules);

    var response = "";
    response += ('var YUI_config = YUI_config || {};');
    response += ('YUI_config.groups = YUI_config.groups || {};');
    response += ('YUI_config.groups["express-yui3"] = {');
    response += ('"base": "' + options.moduleBase + '",');
    response += ('"modules": ');
    response += (JSON.stringify(conf));
    response += ('}');
    
    res.contentType('js');
    res.send(response);
}

/**
 * Produce the actual handler that we are going to use
 * @param modulePath the path on disk to the modules
 * @param options Any options to the handler. Supported options are: 
 *     groupName - The name of the YUI3 module group to configure. defaults to "express-yui3"
 * @return an Express middleware handler
 */
function handler(modulePath, options) {
    options = options || {};
    options.groupName = options.groupName || "express-yui3";
    options.modulePath = modulePath;
    
    var modules = [];
    moduleLoader.loadModules(modulePath, function(m) {
        modules.push(m);
    });
    
    var router = beeline.route({
        "/loader": function(req, res) {
            var baseUrl = req.originalUrl;
            baseUrl = baseUrl.substr(0, baseUrl.length - "/loader".length);
            sendLoader(res, modules, {
                groupName: options.groupName,
                modulePath: options.modulePath,
                moduleBase: baseUrl + "/modules"
                });
        },
        "/modules/`path...`": beeline.staticDir(options.modulePath, {
            ".js": "text/javascript"
        }) 
    });
    
    return router;
}

exports.handler = handler;