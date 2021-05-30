import { API_URL } from "../config";

/**
 * @class ApiRervice
 * request and get data from backend
 */
class ApiService {
  /**
   * request api by url and return data
   * @param {String} url - request url
   * @param {String} method - request http method
   * @param {String} body - body data object
   * @return {Promise<Object>}
   */
  _apiCall(url, method = "GET", body = null, headers = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const fetchObject = {
          method,
          headers: {}
        };

        if (body && headers["Content-Type"] !== "multipart/form-data") {
          fetchObject.headers["Content-Type"] = "application/json";
          fetchObject.body = JSON.stringify(body);
        } else {
          fetchObject.body = body;
        }

        const res = await fetch(`${API_URL}${url}`, fetchObject);
        const result = await res.json();

        if (!res.ok) {
          if (result && result.info.error) {
            return reject(result.error);
          } else {
            return reject(new Error(`Could not fetch ${url}, Res status: ${res.status}`));
          }
        }

        if (result.info.error) {
          return reject(new Error(result.error.message));
        }

        return resolve(result);
      } catch (e) {
        return reject(e);
      }
    });
  }

  /**
   * get data by url and query params
   * GET HTTP method
   *
   * @param {String} url - request url
   * @param {Object} params - query params
   * @return {Promise}
   */
  getData = async (url, params = null) => {
    try {
      const queryString = params
        ? Object.keys(params)
          .map((key) => key + "=" + params[key])
          .join("&")
        : null;

      const requestUrl = queryString ? url + "?" + queryString : url;
      return await this._apiCall(requestUrl);
    } catch (e) {
      throw new Error(e);
    }
  };

  /**
   * create data by body params
   * POST HTTP method
   *
   * @param {String} url - request url
   * @param {Object} body - body object
   * @return {Promise}
   */
  createData = async (url, body, headers = {}) => {
    try {
      return await this._apiCall(url, "POST", body, headers);
    } catch (e) {
      throw new Error(e);
    }
  };

  /**
   * update data by body params
   * PUT HTTP method
   *
   * @param {String} url - request url
   * @param {Object} body - body object
   * @return {Promise}
   */
  updateData = async (url, body) => {
    try {
      return await this._apiCall(url, "PUT", body);
    } catch (e) {
      throw new Error(e);
    }
  };

  /**
   * delete data by body params
   * DELETE HTTP method
   *
   * @param {String} url - request url
   * @param {Object} body - body object
   * @return {Promise}
   */
  deleteData = async (url, body = null) => {
    try {
      if (body) {
        return await this._apiCall(url, "DELETE", body);
      }

      return await this._apiCall(url, "DELETE");
    } catch (e) {
      throw new Error(e);
    }
  };
}

export default ApiService;
