module.exports.name = 'alertKick';

module.exports.send = function(session) {
    return (done) => {
        session.protocol.writeLine('p kickban 1', done);
    }
};
