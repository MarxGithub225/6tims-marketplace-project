import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface sideState {
    isCollapsed: boolean
}


// Define the initial state using that type
const initialState: sideState = {
    isCollapsed: false
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setCollapse: (state, action: PayloadAction<any>) => {
            state.isCollapsed = action.payload
        },
    }
})

export const { setCollapse } = sidebarSlice.actions


export default sidebarSlice.reducer
