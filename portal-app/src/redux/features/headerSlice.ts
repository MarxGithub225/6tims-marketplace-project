import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface HeaderState {
    title: string,
    noHeader: boolean,
    page: string,
    backButton: boolean,
    mobileSidemenu: boolean,
}


// Define the initial state using that type
const initialState: HeaderState = {
    noHeader: false,
    title: '',
    page: '',
    backButton: false,
    mobileSidemenu: false
}

export const titleSlice = createSlice({
    name: 'title',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<any>) => {
            state.title = action.payload
        },
        setPage: (state, action: PayloadAction<any>) => {
            state.page = action.payload
        },
        setBackButton: (state, action: PayloadAction<any>) => {
            state.backButton = action.payload
        },

        setNoHeader: (state, action: PayloadAction<any>) => {
            state.noHeader = action.payload
        },
        setMobileSidemenu: (state, action: PayloadAction<any>) => {
            state.mobileSidemenu = action.payload
        },
    }
})

export const { setTitle, setPage, setBackButton, setNoHeader, setMobileSidemenu } = titleSlice.actions


export default titleSlice.reducer
