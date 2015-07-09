'use strict';

var Lodash = require('lodash');

var options = {
    defaultDependencyVersion: 'HEAD',
    attachmentIdentifiers: { 'attach': true },
    baseURLToken: '{{BASE_URL}}',
    behaviorsFacetKeyName: 'behaviors',
    behaviorSetterRegex: /^\[\[[\w|\|]+\]\]$/,
    componentDelimiter: ':', // e.g. my:great:module
    componentDelimiterRegexp: /:/g,
    configMethodIdentifier: 'config', // e.g. FamousFramework.scene(...).config({...})
    defaultExtends: ['famous:core:node'],
    defaultShorthands: {
        'famous:core': [ 'node' ],
        'famous:events': [
            'abort', 'beforeinput', 'blur', 'click', 'compositionend', 'compositionstart', // FamousEngine supported events
            'compositionupdate', 'dblclick', 'focus', 'focusin', 'focusout', 'input',
            'keydown', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout',
            'mouseover', 'mouseup', 'scroll', 'select', 'wheel', 'touchcancel',
            'touchend', 'touchmove ', 'touchstart',
            'drag', 'tap', 'pinch', 'rotate', // Gestures
            'size-change', 'parent-size-change' // Size Events
        ]
    },
    dependencyBlacklist: { 'localhost': true },
    dependencyRegexp: /([\w-_.]+:)+(([\w-_.]+(?=[\s|>|\/]))|([\w-_.]+(?=:)))/ig,
    entrypointExtnames: { '.js': true },
    eventsFacetKeyName: 'events',
    shorthandsKeyName: 'shorthand',
    libraryInvocationIdentifiers: { 'component': true },
    passThroughKey: '$pass-through',
    reservedEventValues: {},
    treeFacetKeyName: 'tree'
};

module.exports = {
    get: function(key) {
        return options[key];
    },
    set: function(key, value) {
        options[key] = value;
    },
    assign: function(others) {
        options = Lodash.assign(Lodash.clone(options || {}), Lodash.clone(others || {}));
    }
};
