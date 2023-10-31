import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
  authState: boolean,
  userInfos: null | null,
  orgaisationInfos: null | null,
  headerBreadcrumbData: headerBreadcrumbDataState,
  sdkClient: any,
  isSessionExpired: boolean
}

interface headerBreadcrumbDataState {
  role: string,
  fullname: string,
  page: string,
  parentLink: string
}

// Define the initial state using that type
const initialState: AuthState = {
  authState: false,
  userInfos: null,
  orgaisationInfos: null,
  headerBreadcrumbData: {
    role: '',
    fullname: '',
    page: '',
    parentLink: ''
  },
  sdkClient: null,
  isSessionExpired: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAUthState: (state, action: PayloadAction<any>) => {
      state.authState = action.payload
    },
    setUserInfos: (state, action: PayloadAction<any>) => {
      state.userInfos = action.payload
      state.orgaisationInfos = action.payload.organisation
    },
    setSdkClient: (state, action: PayloadAction<any>) => {
      state.sdkClient = action.payload
    },
    setSessionExpired: (state, action: PayloadAction<any>) => {
      state.isSessionExpired = action.payload
    },
    setHeaderBreadcrumbData: (state, action: PayloadAction<any>) => {
      state.headerBreadcrumbData = action.payload
    },
  }
})

export const { setAUthState, setUserInfos, setSdkClient, setSessionExpired, setHeaderBreadcrumbData } = authSlice.actions


export default authSlice.reducer
