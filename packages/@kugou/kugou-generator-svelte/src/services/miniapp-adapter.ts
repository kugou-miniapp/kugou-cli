import type { AxiosPromise, AxiosRequestConfig } from 'axios'
import buildFullPath from "axios/lib/core/buildFullPath"
import settle from "axios/lib/core/settle"
import buildURL from "axios/lib/helpers/buildURL"
import createError from 'axios/lib/core/createError'

export default function MiniAppAdapter(config: AxiosRequestConfig): AxiosPromise<any> {
  return new Promise(function dispatcMiniAppRequest(resolve, reject) {
    const data = config.data || {}
    const headers = config.headers

    const fullPath = buildFullPath(config.baseURL, config.url)
    const url = buildURL(fullPath, config.params, config.paramsSerializer)
    const method = config.method.toUpperCase()

    const options = {
      url,
      method,
      header: headers,
      data,
      dataType: config.dataType || 'json',
      responseType: config.responseType || 'text',
      success(responseData) {
        const response = {
          data: Reflect.has(responseData, 'data') ? responseData.data : responseData,
          status: responseData.statusCode || 200,
          statusText: 'OK',
          headers: responseData.header || {},
          config,
          request
        }

        settle(resolve, reject, response)
      },
      fail(responseData) {
        reject(createError('Network Error', config, null, request, responseData));
      }
    }

    let request = window.MiniApp.request(options)

    if (config.timeout) {
      setTimeout(function handleRequestTimeout() {
        request.abort()
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request));
      }, config.timeout)
    }

    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort()
        reject(cancel)

        request = null
      })
    }
  })
}
