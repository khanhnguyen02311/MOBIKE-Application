import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from '../redux/store';
import {login} from '../redux/slice/authSlice';
import BackendAPI from './index';


export const init = async () => {
    try {
        let isTokenStorageInitialized = await AsyncStorage.getItem('TokenStorageInitted');
        if (!isTokenStorageInitialized) {
            console.log('Initializing token storage');
            AsyncStorage.setItem('TokenStorageInitted', '1');
            AsyncStorage.setItem('CurrentToken', '');
            let tokenStorage = {}
            AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
        } else {
            const currentToken = await getCurrentToken();
            if (currentToken) {
                const myinfo = await BackendAPI.me(currentToken);
                if (myinfo) {
                    // Store.dispatch({
                    //     type: 'auth/logIn',
                    //     payload: {
                    //         ID: myinfo.ID,
                    //         token: currentToken
                    //     }
                    // });
                    Store.dispatch(login({
                        ID: myinfo.ID,
                        token: currentToken
                    }))
                }
            }
        }
    } catch (e) {
        console.log("Init token storage error: " + e);
    }
};

export const print = async () => {
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

export const getToken = async (UID) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        return tokenStorage[UID];
    } catch (e) {
        console.log("Get token error: " + e);
    }
};

export const addToken = async (UID, token) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        tokenStorage[UID] = token;
        AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
    } catch (e) {
        console.log("Add token error: " + e);
    }
};

export const removeToken = async (UID) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        delete tokenStorage[UID];
        AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
    } catch (e) {
        console.log("Remove token error: " + e);
    }
};

export const addUID = async (UID) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        tokenStorage[UID] = "";
        AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
    } catch (e) {
        console.log("Add UID error: " + e);
    }
};

export const setCurrentToken = async (token) => {
    try {
        AsyncStorage.setItem('CurrentToken', token);
    } catch (e) {
        console.log("Set current token error: " + e);
    }
};

export const getCurrentToken = async () => {
    try {
        let token = await AsyncStorage.getItem('CurrentToken');
        return token;
    } catch (e) {
        console.log("Get current token error: " + e);
    }
};

export const removeCurrentToken = () => {
    try {
        AsyncStorage.setItem('CurrentToken', "");
    } catch (e) {
        console.log("Remove current token error: " + e);
    }
}


export default {init, print, getToken, addToken, removeToken, addUID, setCurrentToken, getCurrentToken, removeCurrentToken};