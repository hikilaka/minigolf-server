const sessionState = {
    INVALID: 'invalid',
    LOADING: {
        REQUESTING_ID: 'loading/id',
        VERIFYING_VERSION: 'loading/version',
        VERIFYING_LOCALE: 'loading/locale',
        VERIFYING_LOGIN_TYPE: 'loading/type',
        AWAITING_LOGIN: 'loading/login'
    },
    LOBBY: {
        SELECT_TYPE: 'lobby/select-type',
        IDLE: 'lobby/idle'
    }
};

module.exports = sessionState;
