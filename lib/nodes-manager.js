'use strict';

var VirtualNode = require('./virtual-node.js');
var _ = require('lodash');
var DiscoveryBehavior = require('./behaviors/discovery.js');
var Promise = require('bluebird');
var request = require('request-promise');

module.exports = new NodesManager();

function NodesManager(maxNodeCount) {
    this.maxNodeCount = maxNodeCount || 100;
    this.nodes = [];
    this._ipGenBuffer = [188, 1, 1, 2];
    this._macGenBuffer = [0xF1, 0xF2, 1, 1, 1, 1];
    console.log(this.maxNodeCount);
}

NodesManager.prototype._nextIp = function() {
    var ip = this._ipGenBuffer.join('.');
    //jshint ignore: start
    if (++this._ipGenBuffer[3] >= 255) {
        this._ipGenBuffer[3] = 2;
        if (++this.ipGenBuffer[2] >= 256) {
            this._ipGenBuffer[2] = 1;
            if (++this.ipGenBuffer[1] >= 256) {
                this._ipGenBuffer[1] = 1;
                if (++this.ipGenBuffer[0] >= 256) {
                    throw new Error('Reach max ip address!!!');
                }
            }
        }
    }
    //jshint ignore: end
    return ip;
};

NodesManager.prototype._nextMac = function() {
    var self = this;
    var buf = this._macGenBuffer.map(function(val) {
        return val.toString(16);
    });
    var mac = buf.join(':');

    self._macGenBuffer[5] += 1;
    _.forEachRight(this._macGenBuffer, function(val, index) {
        if (self._macGenBuffer[index] > 255) {
            if (index >= 1) {
                self._macGenBuffer[index-1] += 1;
            }
            else {
                throw new Error('Reach max MAC address!!!');
            }
        }
        else {
            return false;
        }
    });

    return mac;
};

NodesManager.prototype.init = function() {
    _.forEach(_.range(0, this.maxNodeCount), () => {
        var node = new VirtualNode( this._nextIp(), this._nextMac() );
        this.nodes.push(node);
    });
    return this;
};

NodesManager.prototype.start = function() {
    return Promise.map(this.nodes, function(node) {
        return new DiscoveryBehavior(node).start();
    });
};

NodesManager.prototype.stop = function() {

};

NodesManager.prototype.cleanupNodes = function() {
    var options = {
    };
};
