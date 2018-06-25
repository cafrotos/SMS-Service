'use strict'

var EventEmitter = require('events');

class ModelEventEmitter extends EventEmitter{

    static getEmitter(name) {
        if (!ModelEventEmitter._instances) ModelEventEmitter._instances = {};

        if (!ModelEventEmitter._instances[name]) {
            ModelEventEmitter._instances[name] = new ModelEventEmitter;
        }

        return ModelEventEmitter._instances[name];
    }

    static getInstance() {
        if (!ModelEventEmitter._instance) {
            ModelEventEmitter._instance = new ModelEventEmitter();
        }

        return ModelEventEmitter._instance;
    }
}

module.exports = ModelEventEmitter;