var through = require('through2');

var expandComponentSyntax = require('./../expand-component-syntax');

module.exports = function(file) {
    return through(function(buf, enc, next) {
        var str = buf.toString('utf8');

        expandComponentSyntax(str, function(err, output) {
            if (err) {
                return next(err);
            }

            this.push(output);
            next();
        }.bind(this));
    });
};
