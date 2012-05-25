require("mocha");

var path = require("path"),
    should = require("should"),
    moduleloader = require("../lib/moduleloader");

var testdata = path.join(__dirname, "..", "testdata");

describe("Module Loader", function() {
    describe(".loadModules", function() {
        describe("simplemodule", function() {
            it("should find the module", function(done) {
                moduleloader.loadModules(path.join(testdata, "simplemodule"), function(module) {
                    should.exist(module);
                    module.should.have.property("name", "simplemodule");
                    module.should.have.property("version", "1.0.0");
                    module.should.have.property("options");
                    module.options.should.have.property("requires").with.length(2);
                    module.options.requires.should.include("a");
                    module.options.requires.should.include("b");
                    module.should.have.property("files"),
                    module.files.should.have.property("root", path.join(testdata, "simplemodule"));
                    module.files.should.have.property("module", path.join(testdata, "simplemodule", "simplemodule.js"));
                    
                    done();
                });
            });
        });
        describe("testdata", function() {
            it("should find the simplemodule module", function(done) {
                moduleloader.loadModules(testdata, function(module) {
                    should.exist(module);
                    module.should.have.property("name", "simplemodule");
                    module.should.have.property("version", "1.0.0");
                    module.should.have.property("options");
                    module.options.should.have.property("requires").with.length(2);
                    module.options.requires.should.include("a");
                    module.options.requires.should.include("b");
                    module.should.have.property("files"),
                    module.files.should.have.property("root", path.join(testdata, "simplemodule"));
                    module.files.should.have.property("module", path.join(testdata, "simplemodule", "simplemodule.js"));
                    
                    done();
                });
            });
        });
    });
    describe(".loadModule", function() {
        describe("simplemodule", function() {
            it("should find the module", function(done) {
                moduleloader.loadModule(path.join(testdata, "simplemodule", "simplemodule.js"), function(module) {
                    should.exist(module);
                    module.should.have.property("name", "simplemodule");
                    module.should.have.property("version", "1.0.0");
                    module.should.have.property("options");
                    module.options.should.have.property("requires").with.length(2);
                    module.options.requires.should.include("a");
                    module.options.requires.should.include("b");
                    module.should.have.property("files"),
                    module.files.should.have.property("root", path.join(testdata, "simplemodule"));
                    module.files.should.have.property("module", path.join(testdata, "simplemodule", "simplemodule.js"));
                    
                    done();
                });
            });
        });
    });
});