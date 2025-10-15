import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppSelector,
  useAppDispatch, setUserInfo, setUserId
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import { SignInCredential, SignUpCredential } from '@/@types/auth'
import { AuthService } from "@/services/auth/auth.service";
import useQuery from './useQuery'
import ApiService from '@/services/ApiService'

type Status = 'success' | 'failed'

function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    token,
    signedIn
  } = useAppSelector((state) => state.auth.session)
  const userId = useAppSelector(state => state.auth.userInfo.userId)
  const query = useQuery()

  const signIn = async (
    values: SignInCredential
  ): Promise<
    | {
      status: Status
      message: string
    }
    | undefined
  > => {
    try {
      const resp = await AuthService.signIn(values.username, values.password)
      const {
        data,
        code,
        message
      } = resp
      dispatch(setUserId(resp.data.id))

      dispatch(signInSuccess({
        token: data.token,
        refreshToken: '',
        expireTime: 0
      }))
      dispatch(
        setUser(
          {
            fullName: data.username,
            username: data.username,
            role: resp.authority,
            phoneNumber: "1"
          }
        )
      )
      const redirectUrl = query.get(REDIRECT_URL_KEY)
      navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
      return {
        status: 'success',
        message: ''
      }
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.description || errors.toString()
      }
    }
  }

  const signUp = async (values: SignUpCredential) => {
    // try {
    //   await AuthService.signUp(values)
    //   return {
    //     status: 'success',
    //     message: ''
    //   }
    //   // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    // } catch (errors: any) {
    //   return {
    //     status: 'failed',
    //     message: errors?.response?.data?.description || errors.toString()
    //   }
    // }
  }

  const handleSignOut = async () => {
    dispatch(signOutSuccess())
    dispatch(setUserInfo({
      googleLogin: false,
      name: '',
      role: '',
      email: '',
      userId: userId
    }))
    dispatch(
      setUser({
        fullName: '',
        role: [],
        username: ''
      })
    )
    await AuthService.signOut()
    navigate(appConfig.unAuthenticatedEntryPath)
  }

  const signOut = async () => {
    // await apiSignOut()
    handleSignOut()
  }

  return {
    authenticated: token && signedIn,
    signIn,
    signUp,
    signOut,
  }
}

export default useAuth
