import { AxiosRequestConfig } from 'axios'


// SDK OPTIONS
export interface Options extends AxiosRequestConfig {
  version?: string
  token?: string
  baseURL?: string
  timeout?: number
  socketEndpoint?: string
  userId?: string
  headers?: Record<string, any>
  data?: any
  getNewToken?: Function
}

export interface Headers {
  'x-request-id'?: string
  'x-session-id'?: string
  'x-authorization'?: string
  'x-api-key': string
}

export interface ErrorSdk {
  detail: Array<Record<string, any>>
}