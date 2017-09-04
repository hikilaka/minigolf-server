module.exports.name = 'requestLogin';

module.exports.send = function(session) {
    return () => {
        session.protocol.writeData(['status', 'login'].join('\t'));
    }
};
