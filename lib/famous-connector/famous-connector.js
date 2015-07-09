'use strict';

var DataStore = require('./../data-store/data-store');

var COMPONENT_PREFIX = '__famousFramework-';

function FamousConnector(FamousEngine) {
    if (!this instanceof FamousConnector) {
        return new FamousConnector(FamousEngine);
    }

    if (!FamousEngine) {
        throw new Error('You must supply a Famous Engine!');
    }

    this.FamousEngine = FamousEngine;
    this.Camera = this.FamousEngine.components.Camera;    
    this.CoreEngine = this.FamousEngine.core.FamousEngine;
    this.Transitionable = this.FamousEngine.transitions.Transitionable;
    this.Curves = this.FamousEngine.transitions.Curves;
    this.GestureHandler = this.FamousEngine.components.GestureHandler;

    this.renderingComponents = {
        'DOMElement': this.FamousEngine.domRenderables.DOMElement,
        'Mesh': this.FamousEngine.webglRenderables.Mesh
    };

    this.CoreEngine.init();
}

FamousConnector.prototype.addChild = function(famousNode, Constructor) {
    if (Constructor) {
        return famousNode.addChild(new Constructor());
    }
    else {
        return famousNode.addChild();
    }
}

/**
 * Creates the root node for a context.
 * @method  createRoot
 * @param   {String}    selector  The query selector used to create the root Scene.
 */
FamousConnector.prototype.createRoot = function(selector) {
     var scene = this.CoreEngine.createScene(selector);
     DataStore.registerRootScene(selector, scene);
     return scene.addChild();
}

/**
 * Get the camera in the scene. There is 0 or 1 camera's attached to each
 * executed component. If a camera doesn't exist, one will be attached.
 *
 * @method  getCamera
 * @return  {Camera}   A Famous Camera instance.
 */
FamousConnector.prototype.getCamera = function(famousFrameworkComponent) {
    var rootSelector = famousFrameworkComponent.rootSelector;
    if (!DataStore.getCamera(rootSelector)) {
        var rootScene = DataStore.getRootScene(rootSelector);
        var camera = new this.Camera(rootScene);
        DataStore.registerCamera(rootSelector, camera);
    }
    return DataStore.getCamera(rootSelector);
}

FamousConnector.prototype.attachAttributes = function(famousFrameworkComponent, domComponent) {
    var domNode = famousFrameworkComponent.getRootNode();
    var id = domNode.id;
    if (id) {
        domComponent.setId(id);
    }

    var classes = domNode.classList;
    for (var i = 0; i < classes.length; i++) {
        domComponent.addClass(classes[i]);
    }
}

FamousConnector.prototype.attachDOMElement = function(famousNode, content) {
    var domElement = new this.renderingComponents.DOMElement(famousNode);
    domElement.setContent(content);
    return domElement;
}

FamousConnector.prototype.decorateComponent = function(famousFrameworkComponent, decoratorType) {
    var renderNode = famousFrameworkComponent.famousNode;
    var componentName = COMPONENT_PREFIX + decoratorType;
    if (!renderNode[componentName]) {
        var Ctor = this.renderingComponents[decoratorType];
        if (decoratorType === 'Material') {
            renderNode[componentName] = Ctor;
        }
        else {
            renderNode[componentName] = new Ctor(renderNode);
        }

        if (decoratorType === 'DOMElement') {
            attachAttributes(famousFrameworkComponent, renderNode[componentName]);
        }
    }
    return renderNode[componentName];
}

module.exports = FamousConnector;
