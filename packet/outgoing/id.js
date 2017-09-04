module.exports.name = 'id';

module.exports.send = function(session) {
    return () => {
        session.protocol.writeConnection(`id ${session.index}`);
    }
};
