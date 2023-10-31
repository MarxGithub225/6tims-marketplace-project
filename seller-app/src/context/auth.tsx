import React, { useState, useEffect, useContext } from 'react'
import { useAppDispatch } from '../redux/hooks';
import jwt_decode from "jwt-decode";
import { setSessionExpired } from '../redux/features/authSlice';
import { Client as AuthClient } from '../sdks/seller-v1';
import { Seller } from '../sdks/seller-v1/utils/DataSchemas';
import { RefreshTokenResponse, AuthorizeResponse } from '../sdks/auth-v1/utils/DataSchemas';
import { API_SERVER_AUTH } from '../utilities/constants';
export enum AuthStatus {
    Loading,
    SignedIn,
    SignedOut,
}

export interface ISession {
    accessToken: string,
    refreshToken: string
}

  
  export interface IAuth {
    sessionInfo?: { accessToken?: string; refreshToken?: string, userInfo?: any}
    authStatus?: AuthStatus
    verifyCode?:any
    signIn?: any
    signOut?: any
    getSession?: any
    sendCode?: any
    forgotPassword?: any
    changePassword?: any
    setUserInfo?: any
    getRefreshToken?: any
  }
  
  const defaultState: IAuth = {
    sessionInfo: {},
    authStatus: AuthStatus.Loading
  }
  
  export const AuthContext = React.createContext<IAuth>(defaultState)
  
  export const AuthIsSignedIn: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { authStatus, sessionInfo }: IAuth = useContext(AuthContext)
    return <>{
      authStatus === AuthStatus.SignedIn && sessionInfo?.accessToken
      && children
    }</>
  }
  
  export const AuthIsNotSignedIn: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { authStatus }: IAuth = useContext(AuthContext)
  
    return <>{authStatus === AuthStatus.SignedOut && children}</>
  }

  const parseJwt = (token: string): any => {
    try {
      return jwt_decode(token);
    } catch (e) {
      return null;
    }
  };

  const isExpired = (token: string) => {
    const decodedJwt: any = parseJwt(token);

    if (decodedJwt?.exp * 1000 < Date.now()) {
      return true
    }else return false
  }
  const authClient = new AuthClient()
  const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const [authStatus, setAuthStatus] = useState(AuthStatus.Loading)
    const [sessionInfo, setSessionInfo] = useState({})
    const dispatch = useAppDispatch()
  
    function setUserInfo(data: any) {
      setSessionInfo((oldSessionInfo) => {
        return {
          ...oldSessionInfo,
          userInfo: data
        }
      })
    }
    useEffect(() => {
      authClient.configure({
        baseURL: API_SERVER_AUTH,
        headers: {}
      })
    }, [])
  
    useEffect(() => {
      async function getSessionInfo() {
        try {
          const session: ISession = getSession()
          let accessToken: any = ''
          if (isExpired(session.accessToken)) {
            accessToken = await getRefreshToken()
          } else {
            accessToken = session.accessToken
          }


          authClient.configure({
            baseURL: API_SERVER_AUTH,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            getNewToken: getRefreshToken
          })
  
          let user: Seller = await authClient.getMe()
  
          const simpleUser = {
            id: user._id,
            personnalInfo: user.personnalInfo,
            locationInfo: user.locationInfo
          }
  
          setSessionInfo({
            accessToken: accessToken,
            refreshToken: session.refreshToken,
            userInfo: simpleUser,
          });
  
          
          setAuthStatus(AuthStatus.SignedIn)
        } catch (err: any) {
          setAuthStatus(AuthStatus.SignedOut)
        }
      }
  
      getSessionInfo()
    }, [authStatus])
  
    if (authStatus === AuthStatus.Loading) {
      return null
    }
  
    async function signIn(email: string, password: string) {
      try {
        const result: AuthorizeResponse = await authClient.login({
          email: email,
          password: password
        })

        localStorage.setItem('accessToken', result?.token)
        localStorage.setItem('refreshToken', result?.refreshToken)
  
        setAuthStatus(AuthStatus.SignedIn)
      } catch (err) {
        console.log(err)
        setAuthStatus(AuthStatus.SignedOut)
        throw err
      }
    }
  
  
    async function signOut(canReset: boolean = true) {
      localStorage.clear();
      setSessionInfo({})
      setAuthStatus(AuthStatus.SignedOut)
    }
  
    async function verifyCode(email: string, code: string) {
    //   try {
    //     await oauthClient.confirmationCode({
    //       email: email,
    //       code: code,
    //     })
    //   } catch (err) {
    //     throw err
    //   }
    }
  
    function getSession(): ISession {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
  
      if (!accessToken || !refreshToken) {
        throw new Error('No tokens found')
      }
  
      return {
        accessToken,
        refreshToken
      }
    }
  
    async function getRefreshToken() {
      const oldSession: ISession = getSession()
  
      const isRefreshTokenExpired = isExpired(oldSession?.refreshToken)
        
      
      if (!isRefreshTokenExpired) {
        const session: RefreshTokenResponse = await authClient.refreshToken({
          refreshToken: oldSession?.refreshToken,
        })
  
        setSessionInfo((oldSessionInfo) => {
          return {
            ...oldSessionInfo,
            accessToken: session?.token
          }
        })
  
        localStorage.setItem('accessToken', `${session?.token}`)
        localStorage.setItem('refreshToken', session?.refreshToken)
  
        return session?.token;
      } else {
        dispatch(setSessionExpired(true))
        return '';
      }
  
    }
  
    async function sendCode(email: string) {
    //   try {
    //     await oauthClient.resetPasswordCode({
    //       email: email
    //     })
    //   } catch (err) {
    //     throw err
    //   }
    }
  
    async function forgotPassword(data: any) {
    //   try {
    //     await oauthClient.passwordResetCode(data)
    //   } catch (err) {
    //     throw err
    //   }
    }
  
    async function changePassword(data: any) {
    //   try {
    //     await oauthClient.changePassword(data)
    //   } catch (err) {
    //     throw err
    //   }
    }
  
    const authState: IAuth = {
      authStatus,
      sessionInfo,
      signIn,
      signOut,
      verifyCode,
      getSession,
      sendCode,
      forgotPassword,
      changePassword,
      setUserInfo,
      getRefreshToken
    }
  
    return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  }
  
  export default AuthProvider