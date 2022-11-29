import { setHostAddress } from "../redux/slice/hostAddressSlice";
import Store from "../redux/store";

const scheme = "https";

const actualHost = "abcdavid-knguyen.ddns.net";
const localhost = "192.168.1.198";

const port = "30001";

const sleepTime = 1000;

export const SetHost = async () => {
    await Promise.race([
        new Promise((resolve, reject) => {
            let host = GenerateRequestUrl("", actualHost)
            console.log("1. Fetching: " + host);
            fetch(host, {
                method: 'GET',
            }).then((v)=> {
                resolve(0);
            })
            
        }),
        new Promise((resolve, reject) => {
            let host = GenerateRequestUrl("", localhost)
            console.log("2. Fetching: " + host);
            fetch(host, {
                method: 'GET',
            }).then((v)=> {
                resolve(1);
            })
        })
    ]).then((value) => {
        console.log("SetHost: " + value);
        if (value == 0) {
            console.log("Using actual host");
            Store.dispatch(setHostAddress(actualHost));
            return actualHost;
        } else {
            console.log("Using localhost");
            Store.dispatch(setHostAddress(localhost));
            return localhost;
        }
    })
};

const GenerateRequestUrl = (path: String, host: String = actualHost) => {
    let request = scheme + "://" + host + ":" + port + "/" + path;
    return request
};

const PostRequest = async (path: String, body: Object) => {
    try {
        const response = await fetch(
            GenerateRequestUrl(path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            });
        let json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            console.log("Network request failed ( " + path + " ), retrying...");
            return await PostRequest(path, body);
        } else {
            console.log("Fetch Error:" + error)
        }
    }
};

const GetRequest = async (path: String) => {
    try {
        const response = await fetch(
            GenerateRequestUrl(path), {
            method: 'GET',
            keepalive: true,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            });
        let json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            console.log("Network request failed ( " + path + " ), retrying...");
            return await GetRequest(path);
        } else {    
            console.log("Fetch Error:" + error)
            
        }

    }
};

const ProtectedPostRequest = async (path: String, body: Object, token: String) => {
    try {
        const response = await fetch(
            GenerateRequestUrl(path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(body),
            });
        let json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            console.log("Network request failed ( " + path + " ), retrying...");
            return await ProtectedPostRequest(path, body, token);
        } else {    
            console.log("Fetch Error:" + error)

        }
    }
};

const ProtectedGetRequest = async (path: String, token: String) => {
    try {
        const response = await fetch(
            GenerateRequestUrl(path), {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            });
        let json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            console.log("Network request failed ( " + path + " ), retrying...");
            return await ProtectedGetRequest(path, token);
        } else {    
            console.log("Fetch Error:" + error)
        }
    }
};

export const BigGetRequest = async (path: String) => {
    const count = await GetRequest("gets/count/" + path);
    const step = await GetRequest("gets/step");
    let result = [];
    const pros = [];
    let i = 1;

    while (i <= count) {
        pros.push(GetRequest("gets/" + path + "/" + i));
        i += step;
    }

    await Promise.all(pros).then((values) => {
        values.forEach((value) => {
            result = result.concat(value);
        });
    });

    return result;
}

export default {PostRequest, GetRequest, ProtectedPostRequest, ProtectedGetRequest };