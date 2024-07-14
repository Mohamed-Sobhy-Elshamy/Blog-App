import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name:"post",
    initialState: {
        posts: [],    // لما اخد ال post from server اخذنها ف ده
        postsCount: null, // عندي كام post in database 
        postsCate: [], // اخزن بيها post حسب ال category 

        // create new post
        loading: false,
        isPostCreated: false,

        // fetch data for post  details page 
        post: null, 
    },
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setPostsCount(state, action) {
            state.postsCount = action.payload;
        },
        setPostsCate(state, action) {
            state.postsCate = action.payload;
        },

        // create new post 
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setIsPostCreated(state) {
            state.isPostCreated = true;
            state.loading = false;
        },
        clearIsPostCreated(state) {
            state.isPostCreated = false;
        },

        // fetch data for post details page 
        setPost(state, action) {
            state.post = action.payload; // هيكون فيها the post from the server 
        },

        // handle likes
        setLikes(state, action) {
            state.post.likes = action.payload.likes;
        },

        // delete post
        deletePost(state, action) {
            state.posts = state.posts.filter(p => p._id !== action.payload);
            // p as a post 
            // action.payload = هيكون id to deleted post 
        },

        // create comment 
        addCommentToPost(state, action) {
            state.post.comments.push(action.payload); // new comment = action.payload
        }, // push add value to array ###

        // update && delete comment
        updateCommentPost(state, action) {
            state.post.comments = state.post.comments.map(comment => 
                    comment._id === action.payload._id ? action.payload : comment
                )
        },
        deleteCommentFromPost(state, action) { // action.payload = comment id 
            const comment = state.post.comments.find(c => c._id === action.payload)
            // عايزين نعرف comment موجودة ف انهي index in array (comments)
            const commentIndex = state.post.comments.indexOf(comment); 
            // with splice method هنعمل delete له
            state.post.comments.splice(commentIndex, 1); // 1 == delete one comment 
        },
    },
}) 
// نعمل api call 

const postReducers = postSlice.reducer;
const postActions = postSlice.actions;
// exports
export {postReducers, postActions} // نروح store => new state =>> to post