const regex = /^d (\d+) logintype\t(ttm|reg|nr)$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'set-login-type',
        args: {
            loginType: match[2]
        }
    };
};
