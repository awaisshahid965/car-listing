import HttpClient from './HttpClient'

enum AuthEndpoints {
  LOGIN = '/auth/login',
  VALIDATE_USER = '/auth/validation-status',
}

class AuthService extends HttpClient {
  static async login(body: Record<string, string>) {
    const { data, errors } = await this.post(AuthEndpoints.LOGIN, body)
    return { data, errors }
  }

  static async valiateUser(token: string) {
    const { data } = await this.get(AuthEndpoints.VALIDATE_USER, {
      ...(token && { authorization: `Bearer ${token}` }),
    })
    return data
  }
}

export default AuthService
