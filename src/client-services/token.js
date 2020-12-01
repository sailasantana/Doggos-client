import config from '../config';

const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.API_TOKEN_KEY, token);
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.API_TOKEN_KEY);
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.API_TOKEN_KEY);
    }, 
    hasAuthToken() {
        return TokenService.getAuthToken();
    },
    makeBasicAuthToken(userName, password) {
        return window.btoa(`${userName}:${password}`);
    },
};

export default TokenService;