module.exports.name = 'ping';

module.exports.send = function(session) {
    return () => {
        session.ping = Date.now();
        session.protocol.writeConnection('ping');
    }
};
