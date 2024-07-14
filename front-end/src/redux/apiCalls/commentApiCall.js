import { postActions } from "../slices/postSlice";
import { commentActions } from "../slices/commentsSlice";

// عشان كل post ينتمي to post معين
import request from "../../utils/Request"
import { toast } from "react-toastify"

// create comment 

// login user only can write comment 
export function createComment(newComment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post(`/api/comments`, newComment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(postActions.addCommentToPost(data)) // new comment = data
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
} // نعمل run in add comment page


// update comment 
export function updateComment(commentId, comment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/comments/${commentId}`, comment ,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(postActions.updateCommentPost(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // run in comment list 


// delete comment 
export function deleteComment(commentId) {
    return async (dispatch, getState) => {
        try {
            await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(commentActions.deleteComments(commentId))
            dispatch(postActions.deleteCommentFromPost(commentId));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    } 
} // run in comment list 


// Fetch all comments
export function fetchAllComments() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/comments`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(commentActions.setComments(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // run in admin main




