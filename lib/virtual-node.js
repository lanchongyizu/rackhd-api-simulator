'use strict';

var request = require('request-promise');
var config = require('./config');
var tftpClient = require('./tftp-client');

module.exports = VirtualNode;

function VirtualNode(ip, mac) {
    this.ip = ip;
    this.mac = mac;
    this.proxyIp = config.proxyIp;
    this.proxyPort = config.proxyPort;

    console.log('create virtual node, ip=' + this.ip +
        ', mac=' + this.mac +
        ', proxyIp=' + this.proxyIp +
        ', proxyPort=' + this.proxyPort);
}

VirtualNode.prototype._startRequest = function(url) {
    var options = {
        uri: config.southApiBase + url,
        headers: {
            'X-Real-IP': this.ip,
            'X-RackHD-API-proxy-ip': this.proxyIp,
            'X-RackHD-API-proxy-port': this.proxyPort
        }
    };
    return request(options);
};

VirtualNode.prototype.getProfile = function() {
    console.log('getProfile ...');
    return this._startRequest('/profiles' +
        '?macs=' + this.mac +
        '&ips=' + this.ip);
};

VirtualNode.prototype.downloadStatic = function(filename) {
    return this._startRequest('/' + filename);
};

VirtualNode.prototype.tftpGet = function(filename) {
    console.log('tftp download ' + filename + '...');
    return tftpClient.get(filename);
};
