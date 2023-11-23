import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../sdks/product-v1/utils/DataSchemas'
interface CartVariableProps {
    quantity: number
    sku: string
    label: string
}
interface CartProductProps {
    _id: string
    sellerId: string
    title: string
    slug: string
    promo: boolean
    isBonus: boolean
    price: number
    oldPrice: number
    percentage: number
    boughtNumber: number
    bonusNumber: number
    colorId: string
    image: string
    variables: Array<CartVariableProps>
    totalQty: number
    totalPrice: number
    initialProduct: Product
}
// Define a type for the slice state
interface HeaderState {
    cart: Array<CartProductProps>
}


// Define the initial state using that type
const initialState: HeaderState = {
    cart: []
}

export const titleSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state) => {
            const result = localStorage.getItem('__6tims_e_ecommerce_cart__');
            if(result!==null) {
              state.cart = JSON.parse(result);
            }
        },
        setCart: (state, action: PayloadAction<any>) => {
            const result = localStorage.getItem('__6tims_e_ecommerce_cart__');
            if(result !== null) {
                const checkProductExist = JSON.parse(result)?.filter((prod: any) => prod?._id === action.payload?._id)?.length > 0 ? true : false;
                if(checkProductExist) {
                    let cartData: any[] = [];
                    for (let c of JSON.parse(result)) {
                        if(c?._id === action.payload?._id) {
                            cartData.push(action.payload)
                        }else cartData.push(c)
                    }
                    state.cart = cartData
                    localStorage.setItem('__6tims_e_ecommerce_cart__', JSON.stringify(state.cart))
                }else {
                    state.cart =  [...JSON.parse(result), action.payload]
                    localStorage.setItem('__6tims_e_ecommerce_cart__', JSON.stringify(state.cart))
                }
            }else {
                state.cart = [action.payload]
                localStorage.setItem('__6tims_e_ecommerce_cart__', JSON.stringify(state.cart))
            }
        },
        updateCart: (state) => {
            const result = localStorage.getItem('__6tims_e_ecommerce_cart__');
             if(result) {
               localStorage.removeItem('__6tims_e_ecommerce_cart__')
               window.location.href="/"
             }
         },
         deleteCart: (state) => {
           state.cart = []
           localStorage.removeItem('__6tims_e_ecommerce_cart__')
         },
    }
})

export const { setCart, getCart, updateCart, deleteCart } = titleSlice.actions


export default titleSlice.reducer
