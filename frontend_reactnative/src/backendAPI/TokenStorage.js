import AsyncStorage from '@react-native-async-storage/async-storage';

const init = async () => {
    try {
        let isTokenStorageInitialized = await AsyncStorage.getItem('TokenStorageInitted');
        if (!isTokenStorageInitialized) {
            console.log('Initializing token storage');
            AsyncStorage.setItem('TokenStorageInitted', '1');
            AsyncStorage.setItem('CurrentToken', '');
            let tokenStorage = {}
            AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
            console.log('Token storage initialized');
        } else {
            console.log('TokenStorage has already initialized');
        }
    } catch (e) {
        console.log("Init token storage error: " + e);
    }
};

const print = async () => {
    try {
        let isTokenStorageInitialized = await AsyncStorage.getItem('TokenStorageInitted');
        if (isTokenStorageInitialized) {
            let CurrentToken = await AsyncStorage.getItem('CurrentToken');
            console.log("CurrentToken: " + CurrentToken);
            let tokenStorage = await AsyncStorage.getItem('TokenStorage');
            tokenStorage = tokenStorage;
            console.log("TokenStorage: " +tokenStorage);
        } else {
            console.log('TokenStorage has not initialized');
        }
    } catch (e) {
        console.log("Print token storage error: " + e);
    }
};

const getToken = async (UID) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        return tokenStorage[UID];
    } catch (e) {
        console.log("Get token error: " + e);
    }
};

const addToken = async (UID, token) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        tokenStorage[UID] = token;
        AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
    } catch (e) {
        console.log("Add token error: " + e);
    }
};

const removeToken = async (UID) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        delete tokenStorage[UID];
        AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
    } catch (e) {
        console.log("Remove token error: " + e);
    }
};

const addUID = async (UID) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        tokenStorage[UID] = "";
        AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
    } catch (e) {
        console.log("Add UID error: " + e);
    }
};

const setCurrentToken = async (token) => {
    try {
        AsyncStorage.setItem('CurrentToken', token);
    } catch (e) {
        console.log("Set current token error: " + e);
    }
};

const getCurrentToken = async () => {
    try {
        let token = await AsyncStorage.getItem('CurrentToken');
        return token;
    } catch (e) {
        console.log("Get current token error: " + e);
    }
};


export default {init, print, getToken, addToken, removeToken, addUID, setCurrentToken, getCurrentToken};