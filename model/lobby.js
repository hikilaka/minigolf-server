const Game = require('./game'),
      SessionState = require('./session_state');

const lobbyType = {
    SINGLE_PLAYER: 'single',
    TWO_PLAYER: 'dual',
    MULTI_PLAYER: 'multi'
};

const partType = {
    STARTED_GAME: 'started-game',
    JOINED_GAME: 'joined-game',
    DISCONNECTED: 'disconnected',
    SWITCHED_LOBBIES: 'switched-lobbies'
};

class Lobby {
    constructor(type) {
        this.type = type;
        this.players = new Set();
        this.pendingGames = []; // games that don't have enough players
        this.activeGames = []; // games that are currently in progress
    }
    add(player, returnedFromGame) {
        player.session.setState(SessionState.LOBBY.IDLE);
        player.lobby = this;
        player.session.send.lobbyStatus(this);
        player.session.send.lobbyPlayerCount();
        player.session.send.lobbyPlayerNames();
        this.players.add(player);
        this.players.forEach(p =>
            p.session.send.lobbyJoin(player, returnedFromGame));
        // TODO send player pendingGames
    }
    remove(player, reason) {
        this.players.delete(player);
        delete player.lobby;
        this.players.forEach(p =>
            p.session.send.lobbyPart(player, reason));
    }
    createGame(owner, options) {
        this.pendingGames.push(new Game(this, owner, options));
        // TODO: notify all players on this game?
    }
    joinGame(player, gameIndex) {
        if (gameIndex >= this.pendingGames.length) {
            return;
        }
        let game = this.pendingGames[gameIndex];
        game.add(player);
        // TODO: if game full, move to activeGames
    }
    getPlayer(name) {
        for (let player of this.players) {
            if (player.name === name) {
                return player;
            }
        }
        return null;
    }
    get size() {
        return this.players.size;
    }
    get pendingPlayerSize() {
        return this.pendingGames.reduce((a, b) => a += b.size, 0);
    }
    get activePlayerSize() {
        return this.activeGames.reduce((a, b) => a += b.size, 0);
    }
    get gamePlayerSize() {
        return this.pendingPlayerSize + this.activePlayerSize;
    }
}

module.exports = Lobby;
module.exports.Type = lobbyType;
module.exports.PartType = partType;
