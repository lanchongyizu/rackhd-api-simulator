
'use strict';

var nodesManager = require('./lib/nodes-manager.js');
nodesManager.init(4).start()
.then(function() {
    process.exit(0);
})
.catch(function(err) {
    console.error(err);
    process.exit(-1);
});

