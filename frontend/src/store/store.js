import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './shopping-cart/cartSlice'
import cartUiSlice from './shopping-cart/cartUiSlice'
import loginReducer, { initialState } from "./user/userAuthSlice";
import paymentReducer from './payment/paymentSlice'

const storedData = localStorage.getItem("userData");
let parsedData;
if (storedData && storedData !== "undefined") {
    parsedData = JSON.parse(storedData);
} else {
    parsedData = null;
}
const preloadedState = {
    login: { ...initialState, data: parsedData },
};


const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        cartUi: cartUiSlice.reducer,
        login: loginReducer,
        payment: paymentReducer
    },
    preloadedState,
})


export default store