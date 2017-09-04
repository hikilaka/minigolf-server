const fs = require('fs'),
      path = require('path'),
      outgoing = new Map();

fs.readdirSync(__dirname).forEach(file => {
    if (file === path.basename(__filename)) return;
    if (!/\.js$/.test(file)) return;
    
    const sender = require(path.join(__dirname, file));

    if (outgoing.has(sender.name)) {
        console.warn(`warning: duplicate outgoing packet "${sender.name}"`);
    } else {
        outgoing.set(sender.name, sender.send);
    }
});

// return copy of senders as json
module.exports = function(session) {
    let send = {};

    for (let [name, func] of outgoing) {
        send[name] = func(session);
    }
    return send;
};
