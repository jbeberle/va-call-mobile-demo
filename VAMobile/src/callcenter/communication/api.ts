import {featureEnabled} from "../../utils/remoteConfig";
import _ from "underscore";
import {contentTypes, ContentTypes, Params} from "../../store/api";
const DEMO_MODE_DELAY = 300
const METHODS_THAT_ALLOW_PARAMS = ['GET']

const doRequest = async function (
    method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE',
    baseUrl: string,
    endpoint: string,
    params: Params = {},
    contentType: ContentTypes = contentTypes.applicationJson,
    abortSignal?: AbortSignal,
): Promise<Response> {
    const fetchObj: RequestInit = {
        method,
        credentials: 'include',
        // headers: {
        //     authorization: `Bearer ${_token}`,
        //     'X-Key-Inflection': 'camel',
        //     'Source-App-Name': 'va-health-benefits-app',
        //     ...(featureEnabled('SIS') ? { 'Authentication-Method': 'SIS' } : {}),
        // },
        // ...({ signal: abortSignal } || {}),
    }

    if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(method) > -1) {
        fetchObj.headers = {
            ...fetchObj.headers,
            'Content-Type': contentType,
        }
        fetchObj.body = contentType === contentTypes.multipart ? (params as unknown as FormData) : JSON.stringify(params)
    }

    if (METHODS_THAT_ALLOW_PARAMS.indexOf(method) > -1) {
        if (_.keys(params).length > 0) {
            endpoint +=
                '?' +
                _.map(params, (val, key) => {
                    if (val instanceof Array) {
                        return _.map(val, (v) => {
                            return `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
                        }).join('&')
                    } else {
                        return `${encodeURIComponent(key)}=${encodeURIComponent(val as string)}`
                    }
                }).join('&')
        }
    }

    return fetch(`${baseUrl}${endpoint}`, fetchObj).catch((error) => {console.log("An Error Occurred"); console.log(error)}).then(() => console.log("Completed fetch"))
}

const call = async function <T> (
    baseUrl: string,
    method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE',
    endpoint: string,
    params: Params = {},
    contentType?: ContentTypes,
    abortSignal?: AbortSignal,
): Promise<T | undefined> {
    let response
    let responseBody
    try {
        response = await doRequest(method, baseUrl, endpoint, params, contentType, abortSignal)
    } catch (networkError) {
        // networkError coming back as `AbortError` means abortController.abort() was called
        // @ts-ignore
        console.log('networkError=');
        console.log(networkError);
        if (networkError?.name === 'AbortError') {
            return
        }
        throw { networkError: true }
    }
    return await response.json()
}

export const post = async function <T>(endpoint: string, params: Params = {}, contentType?: ContentTypes, abortSignal?: AbortSignal): Promise<T | undefined> {
    // return call<T>('https://va-veis-vamobile-dev.azurewebsites.us', 'POST',  endpoint, params, contentType, abortSignal)
    console.log("posting")
    return call<T>('http://192.168.0.8:8088', 'POST',  endpoint, params, contentType, abortSignal)
}
