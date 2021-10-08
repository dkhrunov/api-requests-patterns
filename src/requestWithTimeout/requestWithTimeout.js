import {TimeoutError} from "./TimeoutError";

export const DEFAULT_REQUEST_TIMEOUT = 10000;

/**
 * Will cancel the request if the response from the server is longer than timeout.
 *
 * @example
 * const getDataWithTimeout = requestWithTimeout(getData())
 *
 * @param request {Promise} - async request of data.
 * @param timeout {number} - the upper bound for waiting for a request.
 * @returns {Promise}
 */
export const requestWithTimeout = (request, timeout = DEFAULT_REQUEST_TIMEOUT) => {
    return Promise.race([
        request,
        new Promise((_, reject) => setTimeout(
            reject,
            timeout,
            new TimeoutError(`Request takes longer than ${timeout} ms`)
        ))
    ])
}
