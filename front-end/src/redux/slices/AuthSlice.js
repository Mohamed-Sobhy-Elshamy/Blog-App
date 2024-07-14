// هكتب ال login, register & logout
import { createSlice } from "@reduxjs/toolkit"
// عشان انشأ ال slice 

const authSlice = createSlice({
    // the state & action بتتعمل ف هذا ال slice اللي تنتمي to auth 

    name: "auth",
    initialState: {
        user: // local storage
        localStorage.getItem("UserInfo") ? 
        JSON.parse(localStorage.getItem("UserInfo"))  // يحولها to object js
        : null,

        registerMessage: null,

        // verification Email
        isAccountVerified: false,
    },

    // نكتب هنا ال actions 
    // action عبارة عن function || method بيعمل تعديل ع ال state 
    // هيكون ف login action & register action & logout action 
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.registerMessage = null;
        },
        // يعني ال user عاوز يخرج من حسابه
        logout(state) {
            state.user = null;
        }, //ف ال logout نرجع ال user = null 

        // register action
        register(state, action) {
            state.registerMessage = action.payload;
        }, // لازم نكتب لها api call

        // تعديل profile photo ف ال local storage 
        setUserPhoto(state, action) {
            state.user.profilePhoto = action.payload;
        },

        // عاوز اغير ال username in header 
        setUsername(state, action) {
            state.user.username = action.payload;
        },

        // Verification Email
        setIsAccountVerified(state) {
            state.isAccountVerified = true;
            state.registerMessage = null;
        }, // authApiCall


        // state = initialState 
        // .user = the user this exist in initail state 
        // action.payload = the data اللي بناخدها from the server هتكون ف ال payload ده
        // لما نعمل login must be server get user 
    }

})


const authReducer = authSlice.reducer; // هنبعتها ف ال store 
const authActions = authSlice.actions; // هنبعتها ف ال AuthApiCall 

// exports 
export { authReducer, authActions } // go to store