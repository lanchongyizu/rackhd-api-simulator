'use strict';

var Promise = require('bluebird');

module.exports = DiscoveryBehavior;

function DiscoveryBehavior(node, options) {
    this.node = node;
    this.options = options;
}

DiscoveryBehavior.prototype.start = function() {
    console.log('DiscoveryBehavior start');
    var promises = [
        this.node.tftpGet.bind(this.node, 'monorail.ipxe'),
        this.node.getProfile.bind(this.node)
    ];

    return this.node.tftpGet('monorail.ipxe')
        .delay(1000)
        .then(() => {
            return this.node.getProfile();
        });
};

DiscoveryBehavior.prototype.stop = function() {

};
