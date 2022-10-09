const scheme = "http";
const host = "192.168.1.161";
const port = "3000";

const GenerateRequestUrl = (path: String) => {

    return scheme + "://" + host + ":" + port + "/" + path;
};

const PostRequest = async (path: String, body: Object) => {
    try {
        if (typeof(body) != "String") {
            body = JSON.stringify(body);
        }
        // console.log("Debug: " + body);
        const response = await fetch(
            GenerateRequestUrl(path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            });
        let json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            console.log("Network request failed, retrying...");
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
            headers: {
                'Content-Type': 'application/json',
            },
            });
        let json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            console.log("Network request failed, retrying...");
            return await GetRequest(path);
        } else {    
            console.log("Fetch Error:" + error)

        }

    }
};

const ProtectedPostRequest = async (path: String, body: Object, token: String) => {
    try {
        if (typeof(body) != "String") {
            body = JSON.stringify(body);
        }
        // console.log("Debug: " + body);
        const response = await fetch(
            GenerateRequestUrl(path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: body,
            });
        let json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            console.log("Network request failed, retrying...");
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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            });
        let json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            console.log("Network request failed, retrying...");
            return await ProtectedGetRequest(path, token);
        } else {    
            console.log("Fetch Error:" + error)
        }
    }
};



// const logIn = async (usernameoremail: String, password: String) : String => {
//     try {
//         const response = await fetch(
//             generateRequestUrl("auth/signin"), {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({usernameoremail: usernameoremail, password: password})
//             })
//         let json = await response.json();
        
//         console.log('Debug: ');
//         console.log('Data: ' + json["msg"]);
//     } catch (error) {
//         if (error instanceof TypeError && error.message === "Network request failed") {
//             console.log("Network request failed, retrying...");
//             return logIn(usernameoremail, password);
//         } else {    
//             console.log("\n\nFetch Error:" + error)
//         }

//     }
// }



export default { PostRequest, GetRequest, ProtectedPostRequest, ProtectedGetRequest };