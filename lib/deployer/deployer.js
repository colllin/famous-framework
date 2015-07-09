'use strict';

var ObjUtils = require('./../utilities/object');
var Component = require('./../component/component');
var DataStore = require('./../data-store/data-store');

function Deployer(frameworkInstance) {
    if (!frameworkInstance) {
        throw new Error('You must supply the deployer an instance of the Famous Framework!');
    }

    this.frameworkInstance = frameworkInstance;
    this.options = ObjUtils.clone(Deployer.DEFAULTS);
}

// Attach an attachment to a the current module
Deployer.prototype.attach = function(name, tag, selector, executable) {
    DataStore.setAttachment(name, tag, {
       selector: selector,
       executable: executable
    });
};

// Execute a component that has already been registered
Deployer.prototype.execute = function(name, tag, selector, configuration, cb) {
    var component = Component.executeComponent(this.frameworkInstance, name, tag, selector, configuration, cb);
    DataStore.saveExecutedComponent(selector, component);
    return component;
};

module.exports = Deployer;
