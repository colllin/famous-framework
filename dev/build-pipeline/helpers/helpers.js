'use strict';

var Lodash = require('lodash');

var Config = require('./../config/config');

var HTTP_REGEXP = /^https?:\/\//i;
var STRING_TYPE = 'string';

function dependencyStringToModuleName(str) {
    var parts = moduleNameToModuleNameSegments(str);
    var head = parts.slice(0, parts.length - 1);
    var moduleName = head.join(Config.get('componentDelimiter'));
    return moduleName;
}

function doesStringLookLikeDependency(str) {
    // Object keys might be numbers, so we have to check here.
    if (typeof str === STRING_TYPE) {
        return str.indexOf(Config.get('componentDelimiter')) !== -1;  
    }
    else {
        return false;
    }
}

function eachDependencyStringInString(str, iterator) {
    var matches = str.match(Config.get('dependencyRegexp'));

    for (var i = 0; i < matches.length; i++) {
        if (!(matches[i] in Config.get('dependencyBlacklist'))) {
            iterator(matches[i]);
        }
    }
}

function moduleNameToEntrypointBasename(moduleName) {
    var moduleNameParts = moduleNameToModuleNameSegments(moduleName);
    return moduleNameParts[moduleNameParts.length - 1];
}

function moduleNameToModuleNameSegments(moduleName) {
    return moduleName.split(Config.get('componentDelimiter'));
}

function importsObjectToFlatImportsObject(importsObj) {
    var flatImports = {};

    for (var selector in importsObj) {
        var array = importsObj[selector];

        for (var i = 0; i < array.length; i++) {
            flatImports[array[i]] = selector + Config.get('componentDelimiter') + array[i];
        }
    }

    return flatImports;
}

function moduleNamespaceAndBasenameToModuleName(moduleNamespace, moduleEntrypointBasename) {
    return moduleNamespace + Config.get('componentDelimiter') + moduleEntrypointBasename;
}

function moduleNameToNamespace(moduleName) {
    return Lodash.first(moduleName.split(Config.get('componentDelimiter')));
}

module.exports = {
    dependencyStringToModuleName: dependencyStringToModuleName,
    doesStringLookLikeDependency: doesStringLookLikeDependency,
    eachDependencyStringInString: eachDependencyStringInString,
    importsObjectToFlatImportsObject: importsObjectToFlatImportsObject,
    moduleNameToNamespace: moduleNameToNamespace,
    moduleNamespaceAndBasenameToModuleName: moduleNamespaceAndBasenameToModuleName,
    moduleNameToEntrypointBasename: moduleNameToEntrypointBasename,
    moduleNameToModuleNameSegments: moduleNameToModuleNameSegments
};
