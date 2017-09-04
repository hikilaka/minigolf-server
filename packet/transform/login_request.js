const regex = /^d (\d+) (loginanon|login\t(.+)\t(.+))$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    let args = {};

    if (match[2] === 'loginanon') {
        args.anonymous = true;
    } else {
        args.username = match[3];
        args.password = match[4];
    }

    return {
        event: 'request-login',
        args: args
    };
};
