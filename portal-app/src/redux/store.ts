import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import carReducer from './features/productSlice'
import sidebarReducer from './features/sidebarSlice'
import themeReducer from './features/themeSlice'
import cartReducer from './features/cartSlice'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  whitelist: ['theme'], //persist only these reducers
  storage,
}

const rootReducer = combineReducers({ 
  auth: authReducer,
  product: carReducer,
  sidebar: sidebarReducer,
  theme: themeReducer,
  cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
