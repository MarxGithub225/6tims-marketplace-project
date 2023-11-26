import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { ChangePassword, CreateRequest, UpdateRequest } from '../utils/DataSchemas'
export default class ProfileService {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async getMe() {
        return request('GET', `profile`, this.options)
    }

    async updateProfile(id: string , data: UpdateRequest) {
        const requestOptions: Options = {
          ...this.options,
          data: data
        }
      
        return request('PATCH', `profile`, requestOptions)
   }

   async changePassword(data: ChangePassword) {
        const requestOptions: Options = {
        ...this.options,
        data: data
        }
    
            return request('POST', `profile/changePassword`, requestOptions)
    }
}
