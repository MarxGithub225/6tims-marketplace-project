import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import {
    RegisterRequest,
    RegisterConfirmationCodeRequest,
    AuthorizeRequest,
    ChangePasswordRequest,
    RefreshTokenRequest,
    ResetPasswordCodeRequest,
    PasswordResetCodeRequest
} from '../utils/DataSchemas'

export default class AuthService {
    options: Options

    constructor(options: Options) {
        this.options = options
    }

    async register(data: RegisterRequest) {
        const requestOptions: Options = {
            ...this.options,
            data: data,
        }
        return request('POST', `register`, requestOptions)
    }

    async authorize(data: AuthorizeRequest) {
        const requestOptions: Options = {
            ...this.options,
            data: data,
        }
        return request('POST', `login-admin`, requestOptions)
    }

    async login(data: AuthorizeRequest) {
        const requestOptions: Options = {
            ...this.options,
            data: data,
        }
        return request('POST', `login`, requestOptions)
    }

    async refreshToken(data: RefreshTokenRequest) {
        const requestOptions: Options = {
            ...this.options,
            headers: {
                ...this.options.headers,
                Authorization: `Bearer ${data.refreshToken}`
            },
            data: ''
        }
        return request('GET', `token`, requestOptions)
    }

    async resetPasswordCode(data: ResetPasswordCodeRequest) {
        const requestOptions: Options = {
            ...this.options,
            data: data,
        }
        return request('POST', `forgot`, requestOptions)
    }

    async passwordResetCode(data: PasswordResetCodeRequest) {
        const requestOptions: Options = {
            ...this.options,
            data: data,
        }
        return request('POST', `reset`, requestOptions)
    }

}
