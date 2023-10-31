import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ThemeState {
    theme: string
}


// Define the initial state using that type
const initialState: ThemeState = {
    theme: 'light'
}

export const sidebarSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<any>) => {
            state.theme = action.payload
        },
    }
})

export const { setTheme } = sidebarSlice.actions


export default sidebarSlice.reducer
