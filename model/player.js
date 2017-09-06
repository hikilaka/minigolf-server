const playerRank = {
    REGULAR: 0,
    MODERATOR: 1,
    ADMIN: 2
};

class Player {
    constructor(session, name) {
        this.session = session;
        this.name = name;
        this.rank = playerRank.REGULAR;
        this.gamesWon = 0;
    }
    get send() {
        return this.session.send;
    }
    toString() {
        let attributes = new String();
        if (this.session.loginType === 'registered') attributes += 'r';
        if (this.rank === playerRank.MODERATOR) attributes += 'v';
        if (this.rank === playerRank.ADMIN) attributes += 's';
        if (attributes.length === 0) attributes = 'w';

        return ['3:'+this.name, attributes, this.gamesWon,
                this.session.locale, '-', '-'].join('^');
    }
}

module.exports = Player;
module.exports.Rank = playerRank;
