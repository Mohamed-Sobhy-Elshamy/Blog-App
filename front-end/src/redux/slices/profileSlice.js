import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        // delete account 
        loading: false,
        isProfileDeleted: false,
        // users in admin dashboard 
        usersCount: null,
        profiles: [], // هعوز كل ال profiles in admin table 
    },

    reducers: {
        setProfile(state, action) {
            state.profile = action.payload;
        },
        setProfilePhoto(state, action) {
            state.profile.profilePhoto = action.payload; // لازم اديله ال new photo اللي جبنها from server 
        },
        updataProfile(state, action) {
            state.profile = action.payload;
        },

        // delete account 
        setLoading(state) {
            state.loading = true
        },
        clearLoading(state) {
            state.loading = false
        },
        setIsProfileDeleted(state) {
            state.isProfileDeleted = true;
            state.loading = false;
        },
        clearIsProfileDeleted(state) {
            state.isProfileDeleted = false
        },
        // users in admin dashboard
        setUsersCount(state, action) {
            state.usersCount = action.payload
        },
        setProfiles(state, aciton) {
            state.profiles = aciton.payload
        }
    }
});

const profileReducers = profileSlice.reducer;
const profileActions = profileSlice.actions;

// exports
export {profileActions, profileReducers}