import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CarState {
    carInfos: any,
    cloneFactoryId: number | null
    categoryId: number | null
}

// Define the initial state using that type
const initialState: CarState = {
    carInfos: {},
    cloneFactoryId: null,
    categoryId: null
}

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        setCarInfosState: (state, action: PayloadAction<any>) => {
            state.carInfos = action.payload
        },
        setCloneFactoryId: (state, action: PayloadAction<any>) => {
            state.cloneFactoryId = action.payload
        },
        setCategoryId: (state, action: PayloadAction<any>) => {
            state.categoryId = action.payload
        },
    }
})

export const { setCarInfosState, setCloneFactoryId, setCategoryId } = carSlice.actions


export default carSlice.reducer
