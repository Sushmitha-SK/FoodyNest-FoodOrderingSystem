import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isLoading: false,
    data: [],
};

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        paymentDetails: (state, action) => {
            state.isLoading = false;
            state.data = action.payload; 
        },
        clearPaymentDetails: (state) => {
            state.data = null; 
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload; 
        },
    },
});


export const { paymentDetails, clearPaymentDetails, setLoading } = paymentSlice.actions;

export default paymentSlice.reducer;
