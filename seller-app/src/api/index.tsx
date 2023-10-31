import axios, { AxiosRequestConfig, Method } from 'axios';
import { Options } from './DataSchemas';
import noResponseError from './error';
import { store } from '../redux/store';
import { setSessionExpired } from '../redux/features/authSlice';
const dispatch = store.dispatch
const request = async (method: string, path: string, options: Options) => {
   
    const requestOptions: AxiosRequestConfig = {
        headers: options.headers,
        baseURL: options.baseURL,
        timeout: options.timeout,
        method: method as Method,
        url: path,
        data: options.data
    };
    let got401Befor: boolean = false
    let accessToken: string
    axios.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        try {
            const originalRequest = error.config;
            if (error.response.status === 401 && !got401Befor && !originalRequest._retry) {
                got401Befor = true
                if (options.getNewToken) {
                    accessToken = await options.getNewToken()
                    originalRequest.headers['Authorization'] =
                    'Bearer ' + accessToken;
                    return axios(originalRequest);
                    
                }
                return Promise.reject(error);
            }else if(got401Befor) {
                dispatch(setSessionExpired(true));
                got401Befor = false
                return Promise.reject({data: null});
            }else {
                return Promise.reject(error);
            }
        } catch (error) {
            console.warn(error);
            return Promise.reject(error);
        }
    });
    return axios(requestOptions).then(
        response => response.data,
        err => errorHanding(err)
    );
};

function errorHanding(err: any) {
    if (
        err.response !== null &&
        err.response !== undefined &&
        err.response.data !== null
    ) {
        return Promise.reject(err.response.data);
    }
    let errorMessages = [];
    errorMessages.push(noResponseError(err));
    return Promise.reject({ errors: errorMessages });
}

export default request;