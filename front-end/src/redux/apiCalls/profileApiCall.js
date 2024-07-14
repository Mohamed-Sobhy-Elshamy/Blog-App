import {profileActions} from '../slices/profileSlice'
import request from '../../utils/Request';
import {toast} from 'react-toastify'

import {authActions} from "../slices/AuthSlice"

// get user profile 
export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const {data} = await request.get(`/api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


// Upload profile photo
// the user want change your profile photo
// بما انه private this is controller يعني ال login user بس
// يبقا اذن محتاج token // هيكون three parameter 

export function uploadProfilePhoto(newPhoto) { // new photo هتكون من نوع form data .. not json 
    return async (dispatch,getState ) => { // get state => function يدينا كل ال state => اللي ف ال store
        try {
            const {data} = await request.post(`/api/users/profile/profile-photo-upload`, newPhoto, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    // لازم احدد ال content type عشان هبعت صورة لل server 
                    "Content-Type": "multipart/form-data" // كده بقول للسيرفر البيانات اللي انا ببعتها من نوع form data
                }
            }); // لازم اكتب action => set profile photo
            dispatch(profileActions.setProfilePhoto(data.profilePhoto));
            dispatch(authActions.setUserPhoto(data.profilePhoto))

            toast.success(data.message)

            // modify the user in local storage with new photo
            // 1. get to user 
            const user = JSON.parse(localStorage.getItem("UserInfo"))
            // 2. the user فيه profile photo
            user.profilePhoto = data?.profilePhoto;
            // 3. set to item in local storage
            localStorage.setItem("UserInfo", JSON.stringify(user))

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // نروح نعمل run to this function => in Profile component 



// update profile 
export function updateProfile(userId, profile) {
    return async (dispatch, getState) => {
        try {
            const {data} = await request.put(
                `/api/users/profile/${userId}`, 
                profile, 
                {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                },
            });
            dispatch(profileActions.updataProfile(data));
            dispatch(authActions.setUsername(data.username));

            // modify the user in local storage with new username
            const user = JSON.parse(localStorage.getItem("UserInfo"))
            user.username = data?.username;
            localStorage.setItem("UserInfo", JSON.stringify(user))

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // نعمل run to this function in update profile model (component)


// delete account 
export function deleteProfile(userId) {
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading())
            const { data } = await request.delete(`/api/users/profile/${userId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                },
            })
            dispatch(profileActions.setIsProfileDeleted())
            toast.success(data?.message);
                // after 2second => false 
                setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()),2000);
        } catch (error) {
            toast.error(error.response.data.message);
            // clear to loading
            dispatch(profileActions.clearLoading())
        }
    }
} // run in profile page


// Get users count (For admin dashboard)
export function getUsersCount() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/users/count`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(profileActions.setUsersCount(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // run in admin main


// Get all users profiles (for admin dashboard)
export function getAllUsersProfile() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/users/profile`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(profileActions.setProfiles(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}










