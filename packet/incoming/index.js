const events = require('events'),
      fs = require('fs'),
      path = require('path');

const commandHandlers = new events.EventEmitter();

fs.readdirSync(__dirname).forEach(file => {
    if (file === path.basename(__filename)) return;
    if (!/\.js$/.test(file)) return;
    
    const handler = require(path.join(__dirname, file));
    handler(commandHandlers);
});

module.exports = function(session) {
    return (data) => {
        return commandHandlers.emit(data.event, session, data.args);
    };
};
