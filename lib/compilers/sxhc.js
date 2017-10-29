const Compile = require('../base-compiler');
var logger = require('../logger').logger;
var _ = require('underscore-node');

function compileSxhc(info, env) {
    const compiler = new Compile(info, env);

    compiler.optionsForFilter = function (filters, outputFilename, userOptions) {
        useLLVM = _.any(userOptions, function(opt) {
            return opt.indexOf("--emit-llvm") > -1;
        });

        if (useLLVM) {
            return ["--emit-llvm", "-o", this.filename(outputFilename)];
        } else {
            return ["--emit-asm", "-o", this.filename(outputFilename)];
        }
    };

    compiler.handlePostProcessResult = function (result, postResult) {
        result.asm = postResult.stdout;
        return result;
    };
    return compiler.initialise();
}

module.exports = compileSxhc;
