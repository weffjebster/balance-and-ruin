function dev_null_error(message) {}
function console_error(message) {
    console.log(message);
}

async function parseResponse(response, error_function) {
    if (!response.ok) {
        if (response.status === 400) {
            let errorText = await response.text();
            if (errorText.toLowerCase().includes('csrf')) {
                error_function("Error: Page expired. Please refresh the page");
                return null;
            }
        }
        error_function("Server error");
        return null;
    }

    let result;
    try {
        result = await response.json();
    } catch (e) {
        error_function("Invalid JSON response");
        return null;
    }

    if (!result.success) {
        if (result.error !== undefined) {
            error_function(result.error);
        }
        if (result.errors !== undefined) {
            for (let ei = 0; ei < result.errors.length; ei++) {
                error_function(result.errors[ei]);
            }
        }
        return null;
    }

    return result;
}

async function getResult(url, error_function = dev_null_error) {
    const response = await fetch(url);
    return await parseResponse(response, error_function);
}

async function methodResult(method, url, csrf, data, error_function) {
    const response = await fetch(url, {
        method: method,
        headers: {
            "X-CSRFToken": csrf,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await parseResponse(response, error_function);
}

async function postResult(url, csrf, data, error_function = dev_null_error) {
    return await methodResult("POST", url, csrf, data, error_function);
}

async function putResult(url, csrf, data, error_function = dev_null_error) {
    return await methodResult("PUT", url, csrf, data, error_function);
}

async function deleteResult(url, csrf, data, error_function = dev_null_error) {
    return await methodResult("DELETE", url, csrf, data, error_function);
}
