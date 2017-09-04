module.exports.name = 'version';

module.exports.send = function(session) {
    return (accepted, done) => {
        if (accepted) {
            session.protocol.writeData(`versok`, done);
        } else {
            session.protocol.writeData(['error', 'vernotok'].join('\t'), done);
        }
    }
};
