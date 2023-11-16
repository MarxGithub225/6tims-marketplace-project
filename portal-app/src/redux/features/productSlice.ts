import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CarState {
    productSelected: any | null,
}

// Define the initial state using that type
const initialState: CarState = {
    productSelected: null,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<any>) => {
            state.productSelected = action.payload
        }
    }
})

export const { setProduct } = productSlice.actions


export default productSlice.reducer
