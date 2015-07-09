var Esprima = require('esprima');
var Escodegen = require('escodegen');
var Estraverse = require('estraverse');

function expandComponentSyntax(str, cb) {
    var ast = Esprima.parse(str);
    cb(null, str);
}

module.exports = expandComponentSyntax;
