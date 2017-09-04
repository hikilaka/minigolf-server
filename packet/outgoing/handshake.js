module.exports.name = 'handshake';

function secureInt() {
    return ~~(Math.random() * 0xffffffff);
}

module.exports.send = function(session) {
    return () => {
        session.protocol.writeLine('h 1');
        session.protocol.writeConnection('io ' + secureInt());
        session.protocol.writeConnection('crt 25');
        session.protocol.writeConnection('ctr');
    };
};
