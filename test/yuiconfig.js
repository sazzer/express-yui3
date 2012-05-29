require("mocha");

var path = require("path"),
    should = require("should"),
    yuiconfig = require("../lib/yuiconfig");

var testdata = path.join(__dirname, "..", "testdata");

describe("YUI Config", function() {
    describe(".moduleConfig", function() {
        describe("simplemodule", function() {
            it("should have the correct details", function() {
                var module = {
                    name: "simplemodule",
                    version: "1.0.0",
                    options: {
                        requires: ["a", "b"]
                    },
                    files: {
                        base: "simplemodule",
                        root: path.join(testdata, "simplemodule"),
                        module: path.join(testdata, "simplemodule", "simplemodule.js")
                    }
                };
                var result = yuiconfig.moduleConfig([module]);
                should.exist(result);
            });
        });
    });
});