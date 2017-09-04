const events = require('events'),
      net = require('net'),
      Lobby = require('./model/lobby'),
      Session = require('./session');

class Server extends events.EventEmitter {
    constructor(port, maxConnections) {
        super();
        this.port = port || 5555;
        this.maxConnections = maxConnections || 50;
        this.sessions = new Map();
        this.lobbies = new Map();

        for (let type of Object.keys(Lobby.Type)) {
            this.lobbies.set(Lobby.Type[type], new Lobby(Lobby.Type[type]));
        }
    }
    removeSession(identifier) {
        const session = this.sessions.get(identifier);
        if (!session) return;
        this.sessions.delete(identifier);
        this.emit('session-disconnected', session);
    }
    listen(done) {
        this.server = net.createServer(socket => {
            const session = new Session(this, socket);
            this.sessions.set(session.identifier, session);
            this.emit('session-connected', session);
        });
        this.server.maxConnections = this.maxConnections;
        this.server.listen(this.port, done);
    }
    start(done) {
        this.startTimeoutInterval();
        this.listen(err => {
            if (err) return done(err);
            done();
        });
    }
    startTimeoutInterval() {
        const timeoutFunc = this.checkTimeouts.bind(this);
        this.timeoutInterval = setInterval(timeoutFunc, 1000);
    }
    checkTimeouts() {
        let now = Date.now(),
            disconnect = [];
        for (let session of this.sessions.values()) {
            let timeout = now - session.timeout,
                ping = now - session.ping;

            if (timeout >= 30000) {
                disconnect.push(session);
                this.emit('session-timeout', session);
            } else if (ping >= 5000) {
                session.send.ping();
            }
        }
        disconnect.forEach(s => s.close());
    }
}

module.exports = Server;

