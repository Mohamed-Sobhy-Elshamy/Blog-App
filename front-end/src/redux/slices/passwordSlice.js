import { createSlice } from "@reduxjs/toolkit"

const passwordSlice = createSlice({
    name: "password",
    initialState: {
        isError: false,
    },
    reducers: {
        setError(state) {
            state.isError = true;
        },
    }
}) // store بقا علطول


const passwordActions = passwordSlice.actions;
const passwordReducer = passwordSlice.reducer;
export {passwordActions, passwordReducer}