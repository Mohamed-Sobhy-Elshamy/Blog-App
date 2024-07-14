// كل ال functions اللي بيبعت requests to server لل AuthSlice هيكون هنا

// i need authActions
import {authActions} from '../slices/AuthSlice'

// axios
// import axios from "axios"

// the first function
// login user function
// مهمته يرسل req to the server ويعمل login to user

// لازم يدينا ال user as a parameter 

/*
لما نعمل api call in redux 
لازم ال function دي ترجع function 
و في ال function الداخلي =>>
هنعمل return to this function = anomunois function
*/

// constant localhost 
import request from '../../utils/Request';

import {toast} from 'react-toastify'


export function loginUser(user) {   // هنعمل run to this function in login page 
    // بيدينا two parameter => dispatch & getState 
    // get state => بياخد ال state اللي موجودة ف ال store 
    // بس مش هحتاجها دلوقتي 
    return async (dispatch, getState) => {
        // هنا هنكتب ال api call بتاعتنا 
        
        // هنبعت req to server => هنكتبها ف try, catch => عشان لو ف error
        try {
            // this is request 
            // هنكتبها  with fetch api => and after that => axios
            // const response = await fetch("http://localhost:8000/api/auth/login", {
            //     method: "POST",
            //     // لازم ندي ال data => in body
            //     body: JSON.stringify(user), // convert object to json file
            //     // user ده obj from js => ال server يتوقع اننا نبعته له json file
            //     // لازم نحدد ف ال headers ان ف ال body => type json
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // });
            // const data = await response.json();


            // fetch api with axios 
            const {data} = await request.post("/api/auth/login", user) // domain => from Request.js



            // نحتاج dispatch 
            // dispatch(authActions.login(data)); // without axios
            dispatch(authActions.login(data)); // with axios

            // authActions فيها كل ال actions اللي تنتمي الى auth 
            // data ادينا as a payload 

            // local storage
            localStorage.setItem("UserInfo", JSON.stringify(data));
            // local storage نحفظ فيها data 
            // key = UserInfo // value = data get the server 

        } catch (error) {
            toast.error(error.response.data.message); // message دي from the server 
        }
    }
}


// logout user function
export function logoutUser() {
    return (dispatch) => {
        dispatch(authActions.logout()); // كده انا ناديت ال logout
        // log out يعمل ال state = null

        // عاوز امسج ال user from local storage 
        localStorage.removeItem("UserInfo");
    }
}
// عايزين ندي ال function دي to button =>>> logout 



// register user function
export function registerUser(user) {
    return async (dispatch) => {
        try {
            const {data} = await request.post("/api/auth/register", user);
            dispatch(authActions.register(data.message));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // وبعدين نروح register component 


// Verify Email
export function verifyEmail(userId, token) {
    return async (dispatch) => {
        try {
            await request.get(`/api/auth/${userId}/verify/${token}`);
            dispatch(authActions.setIsAccountVerified())
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // go to verify email page 

