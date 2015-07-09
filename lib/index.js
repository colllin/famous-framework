'use strict';

require('./polyfills/custom-event');

var DataStore = require('./data-store/data-store');
var Deployer = require('./deployer/deployer');
var FamousConnector = require('./famous-connector/famous-connector');
var Helpers = require('./helpers/helpers');

function FamousFramework(FamousEngine) {
    if (!this instanceof FamousFramework) {
        return new FamousFramework(FamousEngine);
    }

    if (!FamousEngine) {
        throw new Error('You must supply a Famous Engine!');
    }

    this.FamousEngine = FamousEngine;
    this.famousConnector = new FamousConnector(this.FamousEngine);
    this.deployer = new Deployer(this);
    this.helpers = new Helpers(this);
    this.message = require('./messenger/messenger').message;
}

FamousFramework.prototype.component = DataStore.registerModule;
FamousFramework.prototype.getComponentByUID = DataStore.getComponent;
FamousFramework.prototype.registerCustomFamousNodeConstructors = DataStore.registerCustomFamousNodeConstructors;

FamousFramework.prototype.attach = function() {
    return this.deployer.attach.apply(this.deployer, arguments);
};

FamousFramework.prototype.execute = function() {
    return this.deployer.execute.apply(this.deployer, arguments);
};

module.exports = FamousFramework;
