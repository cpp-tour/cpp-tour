"use strict"

const API_URL = "https://wandbox.org/api"
const COMPILE_URL = `${API_URL}/compile.json`

/**
 * Common response handler.
 *
 * Checks whether status is valid.
 *
 * @param {Object} response Fetch's response.
 * @returns {Object} Promise that resolves to JSON.
 * @throws On bad status.
 */
function handle_response(response) {
    if (response.ok) {
        return response.json()
    }
    else {
        throw `Server returned response with code='${response.code}'`
    }
}

/**
 * Requests to compile code.
 *
 * See details of API here https://github.com/melpon/wandbox/blob/master/kennel2/API.rst#post-compilejson
 *
 * @param {Object} request Payload accordingly to wandbox API. At least field `code` is required.
 * @returns {Object} Promise that resolves to Response.
 */
export function compile(request) {
    if (!('code' in request)) {
        throw "No code field in request!"
    }
    if (!('compiler' in request)) {
        request.compiler = 'gcc-head'
    }

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    }

    // TODO: Should we support IE11?
    // eslint-disable-next-line compat/compat
    return fetch(COMPILE_URL, options).then(handle_response)
}
