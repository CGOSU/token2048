import ApiService from "@/services/ApiService";
import { SignInResponse, SignOutResponse } from "@/@types/auth";
import appConfig from '@/configs/app.config';

export const AuthService = {
  async signIn(username: string, password: string): Promise<SignInResponse> {
    // The project's mock server expects POST /users/sign-in with { email, password }
    // while a real backend may expect /user/login with { username, password }.
    const endpoint = appConfig.enableMock ? '/users/sign-in' : '/user/login'
    const payload = appConfig.enableMock ? { email: username, password } : { username, password }

    const axiosRes = await ApiService.fetchData<Record<string, any>, any>({
      url: endpoint,
      method: 'POST',
      data: payload,
    })

    const resData = axiosRes.data

    // If mock returns a plain user object (with access_token), adapt it to SignInResponse
    if (resData && (resData.access_token || resData.token)) {
      return {
        authority: resData.authority || [],
        data: {
          token: resData.access_token || resData.token,
          id: resData.id,
          username: resData.username || resData.email || resData.fullName,
        },
        message: resData.message || '',
        code: 200,
      } as SignInResponse
    }

    // Otherwise assume backend already returns the expected SignInResponse shape
    return resData as SignInResponse;
  },
  async signOut(): Promise<SignOutResponse> {
    const axiosRes = await ApiService.fetchData<Record<string, any>, any>({
      url: "/user/logout"
    })
    const resData = axiosRes.data;
    return resData as SignOutResponse
  }
}
