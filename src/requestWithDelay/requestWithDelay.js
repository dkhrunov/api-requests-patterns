export const DEFAULT_REQUEST_DELAY = 350;

/**
 * Will take care of eliminating the flickering effect when the server responds quickly.
 *
 * @example
 * const getData = () => fetch('https://jsonplaceholder.typicode.com/posts/1');
 *
 * // getting response min after 3 seconds
 * requestWithDelay(getData(), 3000)
 *     .then(response => response.json())
 *     .then(data => console.log(data));
 *
 * @param request {Promise} - async request of data.
 * @param delay {number} - the min time of waiting response.
 * @returns {Promise}
 */
export const requestWithDelay = (request, delay = DEFAULT_REQUEST_DELAY) => {
    return Promise.all([
        request,
        new Promise(resolve => setTimeout(resolve, delay))
    ]).then(values => values[0]);
}
