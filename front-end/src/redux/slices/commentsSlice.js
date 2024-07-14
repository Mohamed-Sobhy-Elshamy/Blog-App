import { createSlice } from "@reduxjs/toolkit"

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [], // هنخزن all comments from server in this array 
    },
    reducers: {
        setComments(state, action) {
            state.comments = action.payload
        },
        deleteComments(state, action) {
            state.comments = state.comments.filter(c => c._id !== action.payload)
        }
    }
})
// هنشتغل معاها لما نيجي نعمل admin dashboard


const commentActions = commentSlice.actions;
const commentReducer = commentSlice.reducer;
// exports 
export { commentActions, commentReducer }