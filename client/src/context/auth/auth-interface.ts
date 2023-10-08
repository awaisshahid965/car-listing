export interface AuthInterface {
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  getAuthToken: () => string
  authErrors: Record<string, string>
}

export const authStateDefaultValues: AuthInterface = {
  isAuthenticated: false,
  loading: true,
  login: async (email: string, password: string) => {},
  getAuthToken: () => '',
  authErrors: {},
}
