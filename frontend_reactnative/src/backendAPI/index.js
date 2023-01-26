import HttpRequest, {BigGetRequest} from "./HttpRequest.js";
import Store from "../redux/store";
import { resolvePlugin } from "@babel/core";


export const me = async (token) => {
    const response = await HttpRequest.ProtectedGetRequest("auth/me", token);
    // console.log("Me: " + JSON.stringify(response));
    if (response.ID) {
        return response
    }
}

export const isEmailExist = async (email: String) => {
    email = email || "";
    console.log("Checking email: " + email);
    const response = await HttpRequest.GetRequest("gets/isemailexists/" + email );
    return response.exists;
}

export const isUsernameExist = async (username: String) => {
    username = username || "";
    console.log("Checking username: " + username);
    const response = await HttpRequest.GetRequest("gets/isusernameexists/" + username );
    return response.exists;
}

export const isPhoneExist = async (phone: String) => {
    phone = phone || "";
    console.log("Checking phone: " + phone);
    const response = await HttpRequest.GetRequest("gets/isphoneexists/" + phone );
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

export const getVehicleBrands = async () => {
    const response = await BigGetRequest("vehiclebrands");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

export const getVehicleLineups = async () => {
    const response = await BigGetRequest("vehiclelineups");
    response.sort((a, b) => a.ID - b.ID)
    // console.log("Vehicle lineups: " + JSON.stringify(response));
    return response;
}

export const getVehicleTypes = async () => {
    const response = await HttpRequest.GetRequest("gets/vehicletypes");
    return response;
}

export const getVehicleConditions = async () => {
    const response = await HttpRequest.GetRequest("gets/vehicleconditions");
    return response;
}

export const getColors = async () => {
    const response = await BigGetRequest("colors");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

const getToken = () => {
    return Store.getState().auth.token;
}

export const getPersonalInfo = async () => {
    let token = getToken();
    const infoResponse = await HttpRequest.ProtectedGetRequest("personal/getinfo", token);
    const addressesResponse = await HttpRequest.ProtectedGetRequest("personal/getaddress", token);
    // console.log("Personal info: " + JSON.stringify(infoResponse));
    // console.log("Personal addresses: " + JSON.stringify(addressesResponse));
    if (infoResponse && addressesResponse) {
        if (infoResponse.message == "Completed" && addressesResponse.message == "Completed") {
            let info = infoResponse.info;
            info.Addresses = addressesResponse.info;
            return info;
        }
    }
}

export default { me, isEmailExist, isUsernameExist, isPhoneExist };