import HttpRequest from "./HttpRequest.js";
import TokenStorage from "./TokenStorage.js";
/**
 * 
 * @param {String} usernameOrEmail 
 * @param {String} password 
 * @returns {String} if successful, returns the token. If not, returns an empty string.
 */
const signIn = async (usernameOrEmail: String, password: String, savePassword: Boolean = true) : String => {
    const response = await HttpRequest.PostRequest("auth/signin", {username_or_email: usernameOrEmail, password: password});
    console.log(response);
    if (response.msg == "Successful") {
        TokenStorage.setCurrentToken(response.token);
        if (savePassword) {
            TokenStorage.addToken(response.uid, response.token);
        } else {
            TokenStorage.addUID(response.uid);
        }
        return response.token;
    }
    return "";
}

const me = async (token) => {
    const response = await HttpRequest.ProtectedGetRequest("auth/me", token);
    console.log(response.ID);
}

export {signIn, me};