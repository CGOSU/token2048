export type SignInCredential = {
  username: string
  password: string
}

export type ForgotPasswordReq = {
  email: string
}

export interface SignInResponse {
  authority: []
  data: LoginData
  message: string
  code: number
}
export interface LoginData {
  token: string
  id: number
  username: string
}
export interface SignOutResponse {
  code: number
  message: string
  data: null
}
export interface ResponseInfoObject {
  status: 'success' | 'failed';
  error_code?: number;
  message?: string;
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
  name: string
  username: string
  password: string
}

