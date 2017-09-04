const crypto = require('crypto'),
      handlers = require('./packet/incoming'),
      senders = require('./packet/outgoing'),
      Protocol = require('./protocol'),
      SessionState = require('./model/session_state');

class Session {
    constructor(server, socket) {
        this.server = server;
        this.socket = socket;
        this.send = senders(this);
        this.handleCommand = handlers(this);
        this.protocol = new Protocol(this);
        this.state = SessionState.INVALID;

        this.updateTimeout();
        this.updateIdentifier();
        this.hookListeners();
    }
    close() {
        this.socket.destroy();
        this.server.removeSession(this.identifier);
    }
    updateTimeout() {
        this.timeout = this.ping = Date.now();
    }
    updateIdentifier() {
        const sha512 = crypto.createHash('sha512');
        sha512.update(this.socket.remoteAddress + Date.now());
        this.identifier = sha512.digest('hex');
    }
    hookListeners() {
        this.socket.on('data', data => this.protocol.handleReceived(data));
        this.socket.on('error', err => console.error('session error', err));
    }
    ensureState(state) {
        return this.state === state;
    }
    setState(state) {
        this.state = state;
    }
    toString() {
        return `Session{id:${this.identifier.substr(0, 5)} ` +
            `addr:${this.socket.remoteAddress} state:${this.state}}`;
    }
}

module.exports = Session;
