function handleQuit(session, request) {
    console.log(`${session} quit`);
    session.close();
}

module.exports = function(commandHandlers) {
    commandHandlers.on('request-quit', handleQuit);
}
