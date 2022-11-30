import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpRequest from '../backendAPI/HttpRequest';
import Store from '../redux/store';
import {login} from '../redux/slice/authSlice';
import BackendAPI from '../backendAPI';


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

export const signUp = async (username: string, email: string, password: string) => {
    const response = await HttpRequest.PostRequest("auth/signup", { username: username, email: email, password: password, permission: 4 });
    console.log("Sign up request sent: " + JSON.stringify(response));
    if (response.message === 'Completed') {
        console.log('Sign up successful, start signing in');
        await signIn(email, password);
    } else {
        console.log(response);
        return response.Error;
    }
}

export const signIn = async (usernameOrEmail: String, password: String, savePassword: Boolean = true): String => {
    const response = await HttpRequest.PostRequest("auth/signin", { username_or_email: usernameOrEmail, password: password });
    console.log("Sign in request sent: " + JSON.stringify(response));
    if (response.message == "Completed") {
        setCurrentToken(response.token);
        if (savePassword) {
            addToken(response.uid, response.token);
        } else {
            addUID(response.uid);
        }

        Store.dispatch(login({
            ID: response.uid,
            token: response.token
        }))

        return response.token;
    }
    return "";
}

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


export default {init, signUp, signIn, print, getToken, addToken, removeToken, addUID, setCurrentToken, getCurrentToken, removeCurrentToken};