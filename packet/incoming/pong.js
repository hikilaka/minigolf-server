// pong must have a handler otherwise the session's
// timeout will expire--causeing the session to disconnect
module.exports = function(commandHandlers) {
    commandHandlers.on('pong', (session, request) => {});
};
