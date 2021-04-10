type HttpResponse = Response & {
  parsedBody?: ServerResponse;
};

/**
 * Utility function for making http requests and handling related errors.
 * @param {RequestInfo} request - Http server request with related parameters.
 * @returns {HttpResponse} Http server response.
 */
const http = async (request: RequestInfo): Promise<HttpResponse> => {
  const response: HttpResponse = await fetch(request);

  const { ok, status, statusText, url, parsedBody } = response;

  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (ex) {}

  if (!ok) {
    throw new Error(`Status: ${status} - Status Text: ${statusText} - Api url: ${url}`);
  }

  if (response.parsedBody?.error) {
    throw new Error(
      `Error: ${parsedBody?.error} - Status: ${response.status} - Status Text: ${response.statusText} - Api url: ${response.url}`,
    );
  }

  return response;
};

/**
 * Http GET request function.
 * @param {string} path - Api path of resource to fetch.
 * @param {RequestInit} args - Object with optional http request init options.
 * @returns {ServerResponse} Server response results.
 */
export const get = async (path: string, args: RequestInit = { method: "get" }): Promise<ServerResponse | undefined> => {
  const response = await http(new Request(path, args));
  return response.parsedBody;
};

/**
 * Http POST request function.
 * @param {string} path - Api path of resource to fetch.
 * @param {BodyType} body - Api request body.
 * @param {RequestInit} args - Object with optional http request init options.
 * @returns {ServerResType} Server response results.
 */
export const post = async <Body>(
  path: string,
  body: Body | null,
  args: RequestInit = { method: "post", body: JSON.stringify(body) },
): Promise<ServerResponse | undefined> => {
  const response = await http(new Request(path, args));
  return response.parsedBody;
};

/**
 * Http PUT request function.
 * @param {string} path - Api path of resource to fetch.
 * @param {Body} body - Api request body.
 * @param {RequestInit} args - Object with optional http request init options.
 * @returns {ServerResponse} Server response results.
 */
export const put = async <Body>(
  path: string,
  body: Body | null,
  args: RequestInit = { method: "put", body: JSON.stringify(body) },
): Promise<ServerResponse | undefined> => {
  const response = await http(new Request(path, args));
  return response.parsedBody;
};

/**
 * Http PATCH request function.
 * @param {string} path - Api path of resource to fetch.
 * @param {Body} body - Api request body.
 * @param {RequestInit} args - Object with optional http request init options.
 * @returns {ServerResponse} Server response results.
 */
export const patch = async <Body>(
  path: string,
  body: Body | null,
  args: RequestInit = { method: "PATCH", body: JSON.stringify(body) },
): Promise<ServerResponse | undefined> => {
  const response = await http(new Request(path, args));
  return response.parsedBody;
};

/**
 * Http DELETE request function.
 * @param {string} path - Api path of resource to fetch.
 * @param {Body} body - Api request body.
 * @param {RequestInit} args - Object with optional http request init options.
 * @returns {ServerRes} Server response results.
 */
export const del = async <Body>(
  path: string,
  body: Body | null,
  args: RequestInit = { method: "delete", body: JSON.stringify(body) },
): Promise<ServerResponse | undefined> => {
  const response = await http(new Request(path, args));
  return response.parsedBody;
};
