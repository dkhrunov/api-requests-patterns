export const DEFAULT_REQUEST_DELAY = 350;

/**
 * Will take care of eliminating the flickering effect when the server responds quickly.
 *
 * @example
 * const getDataWithDelay = requestWithDelay(getData());
 *
 * @param request {Promise} - async request of data.
 * @param delay {number} - the min time of waiting response.
 * @returns {Promise}
 */
export const requestWithDelay = (request, delay = DEFAULT_REQUEST_DELAY) => {
    return new Promise.all([
        request,
        new Promise(resolve => setTimeout(resolve, delay))
    ]).then(values => values[0]);
}
