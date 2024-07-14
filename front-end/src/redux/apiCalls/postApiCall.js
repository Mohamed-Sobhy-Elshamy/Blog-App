import { postActions } from "../slices/postSlice";
import request from "../../utils/Request";
import { toast } from "react-toastify"

// Fetch posts based on page number (Home page)

// pageNumber as a parameter 
/*
    1. send request to server 
    2. لازم نديله pageNumber as a Query
    3. ف ال dispatch اديه data => اللي اخدتها from server 
*/
export function fetchPosts(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} 
// هعمل run in post page && home page 


// get posts count 
export function getPostsCount() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/count`);
            dispatch(postActions.setPostsCount(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // run in admin main page 


// fetch posts based on category 
export function fetchPostsBasedOnCategory(category) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?category=${category}`);
            dispatch(postActions.setPostsCate(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
} // هيجيب لنا ال post حسب ال category
// هروح to category page 


// **********************

// Create post 
/*
    .post => the first argument = المسار end point 
    the second argument = date البيانات = newPost 
    the third argument = authorization => headers 
*/

// get state => عشان ال loged user هو اللي يقدر يعمل create post 
export function createPost(newPost) {
    return async (dispatch, getState) => {
        try {
            dispatch(postActions.setLoading()); // يعمل loading is true 
            // وبعدين send request to the server 

            await request.post(`/api/posts`, newPost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data" // لان new post => type = form data 
                }
            })

            dispatch(postActions.setIsPostCreated());
            /*
                لما يكون is post created true => تم حفظ new post in server 
                وكل حاجة تمام لازم يعمل navigate to home page 
                ولازم نعملها false =>>> after 2second 
                لو مرجعتش false مش هقدر افتح create post تاني 
            */
            setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000) // 2000 = 2seconds 
            // ده اللي بيفتح create post page again 
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(postActions.clearLoading());
        }
    }
} // نعمل run in create post form & نديه newPost 


// fetch single post 
export function fetchSinglePost(postId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/${postId}`);
            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
// this function send request to server && get post ع حسب ال id 
// نحتاجها ف post details page 


// toggle like post 
export function toggleLikePost(postId) {
    return async (dispatch, getState) => {
        try {
            const {data} = await request.put(`/api/posts/like/${postId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            }); // not send data to server

            dispatch(postActions.setLikes(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


// update post image 
export function updatePostImage(newImage, postId) {
    return async (dispatch, getState) => {
        try {
            await request.put(`/api/posts/update-image/${postId}`, newImage, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            })
            toast.success("New post image uploaded SUCCESSFULLY :)");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
// نعمل run in post details page



// update post 
export function updatePost(newPost, postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/posts/${postId}`, newPost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(postActions.setPost(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}



// delete post 
export function deletePost(postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(postActions.deletePost(data.postId))
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // run in post table


// Get all post
export function getAllPosts(){
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts`);
            dispatch(postActions.setPosts(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
} // run in post table





