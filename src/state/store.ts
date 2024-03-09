import { configureStore } from "@reduxjs/toolkit";
// import counterreducer from "./counter/counterSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./apiSlice";
import cartReducer from "../state/cart/cartSlice";
import userReducer from "../state/user/userApiSlice";

const persistConfig = {
    key: 'root',
    storage
} 
//const persistedReducer = persistReducer(persistConfig, userreducer);
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer,
        user: userReducer
    },
    middleware: getDefaultMiddleware => 
       getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
