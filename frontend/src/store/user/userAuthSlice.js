import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isLoading: false,
    data: [],
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginDetails: (state, { payload }) => {
            console.log('Payload Datadsdsd', payload)
            state.isLoading = false;
            state.data = payload.user;
            console.log('Payload Data', payload)
            localStorage.setItem("userData", JSON.stringify(payload));
        },
        clearLoginDetails(state) {
            state.data = []
        }
    },
});

export const { loginDetails, clearLoginDetails } = loginSlice.actions;

export default loginSlice.reducer;