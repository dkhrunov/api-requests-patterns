import {BadResponseError} from "./BadResponseError";

const exponentialBackoffStrategy = x => 2 ** x

/**
 * Will take care of eliminating the flickering effect when the server responds quickly.
 *
 * @example
 * const getDataWithRetry = requestWithRetry(() => getData(), 3);
 * // or
 * const linerBackoffStrategy = x => (2 * x) + 1;
 * const getDataWithRetry = requestWithRetry(() => getData(), 3, linerBackoffStrategy);
 *
 * @param request {() => Promise} - async request of data.
 * @param retries {number} - number of attempts.
 * @param strategy {(number) => number} - request rate function. Default exponential function.
 * @returns {Promise}
 */
export const requestWithRetry = async (request, retries, strategy = exponentialBackoffStrategy, iteration = 0) => {

    try {
        const response = await request();
        return ensureStatus(response);
    } catch (error) {
        if (retries > iteration) {
            await new Promise(resolve => setTimeout(resolve, strategy(iteration) * 1000));
            return requestWithRetry(request, retries, strategy, iteration++);
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
