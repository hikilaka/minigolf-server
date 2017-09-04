const Server = require('./server'),
      Connections = require('./model/connections'),
      Lobby = require('./model/lobby'),
      SessionState = require('./model/session_state');

let server = new Server(5555);

server.on('session-connected', session => {
    console.log('connect: ' + session);
    session.send.handshake();
    session.state = SessionState.LOADING.REQUESTING_ID;
});

server.on('session-disconnected', session => {
    if (session.player) {
        if (session.player.lobby) {
            let lobby = session.player.lobby;
            lobby.remove(session.player, Lobby.PartType.DISCONNECT);
        }
    }
    if (session.index !== undefined) {
        Connections.remove(session);
    }
    console.log('disconnect ' + session);
});

server.on('session-timeout', session => {
    console.log('timeout ' + session)
});

server.start(err => {
    if (err) {
        return console.error(err);
    }
    console.log('server binded to port 5555');
});
