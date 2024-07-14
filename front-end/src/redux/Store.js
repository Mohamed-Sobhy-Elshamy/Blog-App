import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/AuthSlice";
import { profileReducers } from "./slices/profileSlice";
import { postReducers } from "./slices/postSlice";
import { categoryReducer } from "./slices/categorySlice";
import { commentReducer } from "./slices/commentsSlice";
import { passwordReducer } from "./slices/passwordSlice";
// عشان نعمل ال store بتاعنا محتاجين configStore 

const store = configureStore({
    // ال store بتاعتنا هتكون ف ال obj ده
    reducer: {
        auth: authReducer,
        profile: profileReducers,
        post: postReducers,
        category: categoryReducer,
        comment: commentReducer,
        password: passwordReducer,
    }
})
// لازم ندي ال store to provider 
// يعني لازم نحدد ال store to my application


// export
export default store;