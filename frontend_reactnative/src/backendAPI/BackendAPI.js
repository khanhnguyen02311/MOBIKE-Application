import HttpRequest from "./HttpRequest.js";
import TokenStorage from "./TokenStorage.js";
import { store } from '../redux/store';


export const signUp = async (username: string, email: string, password: string) => {
    const response = await HttpRequest.PostRequest("auth/signup", {username: username, email: email, password: password, permission: 4});
    console.log("Sign up request sent: " + response);
    if (response.msg === 'Successful') {
        console.log('Sign up successful, start signing in');
        await signIn(email, password);
    } else {
        console.log(response);
        return response.Error;
    }
}

/**
 * 
 * @param {String} usernameOrEmail 
 * @param {String} password 
 * @returns {String} if successful, returns the token. If not, returns an empty string.
 */
export const signIn = async (usernameOrEmail: String, password: String, savePassword: Boolean = true) : String => {
    const response = await HttpRequest.PostRequest("auth/signin", {username_or_email: usernameOrEmail, password: password});
    console.log("Sign in request sent: " + response);
    if (response.msg == "Successful") {
        TokenStorage.setCurrentToken(response.token);
        if (savePassword) {
            TokenStorage.addToken(response.uid, response.token);
        } else {
            TokenStorage.addUID(response.uid);
        }
        store.dispatch({
            type: 'auth/logIn',
            payload: {
                ID: response.uid,
                token: response.token
            }
        });
        return response.token;
    }
    return "";
}

export const me = async (token) => {
    const response = await HttpRequest.ProtectedGetRequest("auth/me", token);
    if (response.ID) {
        console.log(response);
        return response
    }
}

export const isEmailExist = async (email: String) => {
    email = email || "";
    console.log("Checking email: " + email);
    const response = await HttpRequest.PostRequest("posts/isemailexists", {email: email});
    return response.exists;
}

export const isUsernameExist = async (username: String) => {
    username = username || "";
    console.log("Checking username: " + username);
    const response = await HttpRequest.PostRequest("posts/isusernameexists", {username: username});
    return response.exists;
}

export const getVersion = async (name: String) => {
    const response = await HttpRequest.GetRequest("gets/version/" + name);
    return response;
}

export const getPermissions = async () => {
    const response = await HttpRequest.GetRequest("gets/permissions");
    return response;
}

export const getCities = async () => {
    const response = await HttpRequest.GetRequest("gets/cities");
    return response;
}

export const getDistricts = async () => {
    const response = await HttpRequest.GetRequest("gets/districts");
    return response;
}

export const getWards = async () => {
    const response = await HttpRequest.GetRequest("gets/wards");
    return response;
}

export const getImageTypes = async () => {
    const response = await HttpRequest.GetRequest("gets/imagetypes");
    return response;
}

export default {signUp, signIn, me, isEmailExist, isUsernameExist};