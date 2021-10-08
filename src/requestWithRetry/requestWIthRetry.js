import {BadResponseError} from "./BadResponseError";

const exponentialBackoffStrategy = x => 2 ** x

/**
 * Will take care of eliminating the flickering effect when the server responds quickly.
 *
 * @example
 * const getData = () => fetch('https://jsonplaceholder.typicode.com/posts/1');
 *
 * requestWithRetry(getData, 5)
 *     .then(response => response.json())
 *     .then(data => console.log(data));
 *
 * // with custom backoff strategy
 * const linerBackoffStrategy = x => (2 * x) + 1;
 *
 * requestWithRetry(getData, 5, linerBackoffStrategy)
 *     .then(response => response.json())
 *     .then(data => console.log(data));
 *
 * @param request {() => Promise} - async request of data.
 * @param retries {number} - number of attempts.
 * @param strategy {(number) => number} - request rate function. Default exponential function.
 * @param iteration {number} - **dont set this param if you wanna be correct process.**
 * @returns {Promise}
 */
export const requestWithRetry = async (request, retries, strategy = exponentialBackoffStrategy, iteration = 0) => {

    try {
        const response = await request();
        return ensureStatus(response);
    } catch (error) {
        if (retries > iteration) {
            await new Promise(resolve => setTimeout(resolve, strategy(iteration) * 1000));
            return requestWithRetry(request, retries, strategy, iteration + 1);
        } else {
            throw error;
        }
    }
}

const ensureStatus = (response) => {
    if (response.status >= 500) {
        throw new BadResponseError(`Server returned status code ${response.status}`);
    }

    return response;
}
