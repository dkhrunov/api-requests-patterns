# api-requests-patterns
This is repository for illustrating some examples of api requests patterns 

**requestWithDelay** - creates a request with min awaiting time.

**requestWithTimeout** - creates a request and waits for its execution within the time limit passed by the second argument, if the request was not processed within the specified limit, then the request will be canceled and throw error.

**requestWithRetry** - creates a request and if was bad request then try to retry request with specified number of times. Also you can pass backoff function, by default it is exponential function. 
