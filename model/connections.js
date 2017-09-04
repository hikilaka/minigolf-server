connections = {
    list: [],
    open: []
};

module.exports.add = function(session) {
    if (connections.open.length === 0) {
        connections.list.push(session);
        session.index = connections.list.length - 1;
    } else {
        let position = connections.open.shift();
        connections.list[position] = session;
        session.index = position;
    }
};

module.exports.remove = function(session) {
    connections.list[session.index] = null;
    delete connections.list[session.index];
    connections.open.push(session.index);
    delete session.index;
};

module.exports.forEach = function(func) {
    connections.list.forEach(func);
};
