'use strict';

module.exports = {
    server: '172.31.128.1',
    southPort: 9080,
    northPort: 8080,
    southApiBase: 'http://172.31.128.1:9080/api/current',
    northApiBase: 'http://172.31.128.1:8080/api/current',
    tftpServer: '172.31.128.1',
    tftpPort: 69,
    proxyIp: '127.0.0.1',
    proxyPort: '7180'
};
