const scheme = "https";
const host = "abcdavid-knguyen.ddns.net";
const port = "30001";

const retryInterval = 100;
const maxRetry = 10;

const GenerateRequestUrl = (path: String) => {
    let request = scheme + "://" + host + ":" + port + "/" + path;
    return request
};

const ProcessResponse = async (response: Object) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        const json = await response.json();
        return json;
    } else {
        const text = await response.text();
        return text;
    }
}

const PostRequest = async (path: String, body: Object, retry: Number = 0) => {
    try {
        const response = await fetch(
            GenerateRequestUrl(path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await ProcessResponse(response);
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            retry += 1;
            console.log("PostRequest: Network request failed ( " + path + " ), retrying (" + retry + ")...");
            if (retry <= maxRetry) {
                return await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(PostRequest(path, body, retry));
                    }, retryInterval);
                });
            }
        } else {
            console.log("Fetch Error:" + error)
        }
    }
};

const GetRequest = async (path: String, retry: Number = 0) => {
    try {
        const url = GenerateRequestUrl(path);
        console.log("Get request url: " + url);
        const response = await fetch(
            url, {
            method: 'GET',
            keepalive: true,
        });
        return await ProcessResponse(response);
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            retry += 1;
            console.log("GetRequest: Network request failed ( " + path + " ), retrying (" + retry + ")...");
            if (retry <= maxRetry) {
                return await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(GetRequest(path, retry));
                    }, retryInterval);
                });
            }
        } else {
            console.log("Fetch Error:" + error)
        }

    }
};

const ProtectedPostRequest = async (path: String, body: Object, token: String, retry: Number = 0) => {
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
        return await ProcessResponse(response);
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            retry += 1;
            console.log("ProtectedPostRequest: Network request failed ( " + path + " ), retrying (" + retry + ")...");
            if (retry <= maxRetry) {
                return await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(ProtectedPostRequest(path, body, token, retry));
                    }, retryInterval);
                });
            }
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
        return await ProcessResponse(response);
    } catch (error) {
        if (error instanceof TypeError && error.message === "Network request failed") {
            retry += 1;
            console.log("ProtectedGetRequest: Network request failed ( " + path + " ), retrying (" + retry + ")...");
            if (retry <= maxRetry) {
                return await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(ProtectedGetRequest(path, token, retry));
                    }, retryInterval);
                });
            }
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

export default { PostRequest, GetRequest, ProtectedPostRequest, ProtectedGetRequest };