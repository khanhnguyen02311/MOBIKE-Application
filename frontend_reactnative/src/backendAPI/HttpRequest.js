const scheme = "https";
const host = "abcdavid-knguyen.ddns.net";
const port = "30001";

const retryInterval = 100;
const maxRetry = 10;

export const GenerateRequestUrl = (path: String) => {
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
        const url = GenerateRequestUrl(path);
        console.log("Post request url: " + url);
        const response = await fetch(
            url, {
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
        const url = GenerateRequestUrl(path);
        console.log("Protected Post request url: " + url);
        const response = await fetch(
            url, {
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

const ProtectedGetRequest = async (path: String, token: String, retry: Number = 0) => {
    try {
        const url = GenerateRequestUrl(path);
        console.log("Protected Get request url: " + url);
        const response = await fetch(
            url, {
            method: 'GET',
            headers: {
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
    const concurrent = await GetRequest("gets/concurrent");
    let result = [];
    const pros = [];
    let i = 1;

    while (i <= count) {
        pros.push(GetRequest("gets/" + path + "/" + i));
        i += step;
    }

    i = 0;
    while (i < pros.length) {
        const pro = pros.slice(i, i + concurrent);
        const values = await Promise.all(pro);
        values.forEach(value => {
            result = result.concat(value);
        });
        i += concurrent;
    }
    return result;
}

export const UploadImage = async (image: Object) => {
    try {
        const formData = new FormData();
        formData.append('file', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
        });
        console.log('formData: ', JSON.stringify(formData));
        const response = await fetch(GenerateRequestUrl("image/upload"), {
            method: 'POST',
            body: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(await ProcessResponse(response));
    } catch (error) {
        console.log('Save Image Error: ' + error);
    }
}



export const UploadPost = async (title: string, content: string, pricetag: Number, images: Array<Object>, token: String) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('pricetag', pricetag);
        images.forEach(image => {
            formData.append('images', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
        });
        console.log('Upload post FormData: ', JSON.stringify(formData));
        const response = await fetch(GenerateRequestUrl("personal/post/create"),{
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            },
            body: formData,
        })
        return ProcessResponse(await ProcessResponse(response))
    } catch (error) {
        console.log("Upload Post Error: " + error)
    }
}

export default { PostRequest, GetRequest, ProtectedPostRequest, ProtectedGetRequest };