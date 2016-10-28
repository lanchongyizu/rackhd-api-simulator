
'use strict';

var tftp = require('tftp');
var Promise = require('bluebird');
var config = require('./config.js');

var tftpGetPromise = function(fileName) {
    var client = tftp.createClient({
        host: config.tftpServer,
        port: config.tftpPort || 69
    });

    return new Promise(function(resolve, reject) {
        client.get(fileName, {}, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};

module.exports = {
    get: tftpGetPromise
};
