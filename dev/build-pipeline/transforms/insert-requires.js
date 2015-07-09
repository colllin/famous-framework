var through = require('through2');

var insertComponentRequires = require('./../insert-component-requires');

module.exports = function(file) {
    return through(function(buf, enc, next) {
        var str = buf.toString('utf8');

        insertComponentRequires(str, function(err, output) {
            if (err) {
                return next(err);
            }

            this.push(output);
            next();
        }.bind(this));
    });
};
