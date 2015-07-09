var Esprima = require('esprima');
var Escodegen = require('escodegen');
var Estraverse = require('estraverse');

function insertComponentRequires(str, cb) {
    var ast = Esprima.parse(str);
    cb(null, str);
}

module.exports = insertComponentRequires;
