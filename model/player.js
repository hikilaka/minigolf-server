const playerPrivilge = {
    REGULAR: 0,
    MODERATOR: 1,
    ADMIN: 2
};

class Player {
    constructor(session, name) {
        this.session = session;
        this.name = name;
        this.privilge = playerPrivilge.REGULAR;
        this.gamesWon = -1;
    }
    toString() {
        let attributes = new String();
        if (this.session.loginType === 'registered') attributes += 'r';
        if (this.privilge === playerPrivilge.MODERATOR) attributes += 'v';
        if (this.privilge === playerPrivilge.ADMIN) attributes += 's';
        if (attributes.length === 0) attributes = 'w';

        return ['3:'+this.name, attributes, this.gamesWon,
                this.session.locale, '-', '-'].join('^');
    }
}

module.exports = Player;
module.exports.Privilige = playerPrivilge;
