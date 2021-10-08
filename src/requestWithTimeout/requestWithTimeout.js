import {TimeoutError} from "./TimeoutError";

export const DEFAULT_REQUEST_TIMEOUT = 5000;

/**
 * Will cancel the request and throw error if the response from the server is longer than timeout.
 *
 * @example
 * const getData = () => fetch('https://jsonplaceholder.typicode.com/posts/1');
 *
 * // getting error if server dont response after 100ms
 * requestWithTimeout(getData(), 100)
 *     .then(response => response.json())
 *     .then(data => console.log(data))
 *     .catch(error => console.error(error));
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
