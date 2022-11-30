import HttpRequest, {BigGetRequest} from "./HttpRequest.js";
import { resolvePlugin } from "@babel/core";


export const me = async (token) => {
    const response = await HttpRequest.ProtectedGetRequest("auth/me", token);
    console.log("Me: " + JSON.stringify(response));
    if (response.ID) {
        
        return response
    }
}

export const isEmailExist = async (email: String) => {
    email = email || "";
    console.log("Checking email: " + email);
    const response = await HttpRequest.GetRequest("posts/isemailexists/" + email );
    return response.exists;
}

export const isUsernameExist = async (username: String) => {
    username = username || "";
    console.log("Checking username: " + username);
    const response = await HttpRequest.PostRequest("posts/isusernameexists/" + username );
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
    const response = await BigGetRequest("cities");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

export const getDistricts = async () => {
    const response = await BigGetRequest("districts");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

export const getWards = async () => {
    const response = await BigGetRequest("wards");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

export const getImageTypes = async () => {
    const response = await HttpRequest.GetRequest("gets/imagetypes");
    return response;
}

export default { me, isEmailExist, isUsernameExist };