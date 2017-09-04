class Game {
    constructor(lobby, owner, options) {
        this.lobby = lobby;
        this.players = new Set();
        this.options = options; // TODO: || defaultOptions

        this.add(owner);
    }
    add(player) {
        this.players.add(player);
        // TODO: set player state
        // TODO: if full, initialize game
    }
}

module.exports = Game;
