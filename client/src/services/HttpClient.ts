import { HttpRequestMethods } from '../constants'

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT
console.log(API_ENDPOINT)

const headerConfig = { 'Content-Type': 'application/json' }

class HttpClient {
  static async get(resourcePath: string, headers?: Record<string, string>) {
    const request = await fetch(`${API_ENDPOINT}${resourcePath}`, {
      method: HttpRequestMethods.GET,
      headers: {
        ...headerConfig,
        ...headers,
      },
    })
    const responseObject = await request.json()
    return responseObject
  }

  static async post(resourcePath: string, body: any, headers?: Record<string, string>) {
    const request = await fetch(`${API_ENDPOINT}${resourcePath}`, {
      method: HttpRequestMethods.POST,
      headers: {
        ...headerConfig,
        ...headers,
      },
      body: JSON.stringify(body),
    })
    const responseObject = await request.json()
    return responseObject
  }
}

export default HttpClient
