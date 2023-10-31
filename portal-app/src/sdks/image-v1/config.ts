interface API {
  baseUrl: string
  timeout: number
  version: string
}

const API: API = {
  baseUrl: 'https://localhost:3000/dev',
  timeout: 30000,
  version: 'v1'
}

export default API
