'use strict';

var piecewise = require('./piecewise');
var clone = require('./../utilities/object').clone;

function Helpers(frameworkInstance) {
    this.frameworkInstance = frameworkInstance;
}

Helpers.prototype.clone = clone;

Helpers.prototype.piecewise = function(points) {
    return piecewise(points, this.frameworkInstance.famousConnector.Curves);
}

Helpers.prototype.formatStyle = function (styleObj) {
    var styleStr = '';
    for (var name in styleObj) {
        styleStr += name + ':' + styleObj[name] + '; ';
    }
    return styleStr;
};

module.exports = Helpers;
