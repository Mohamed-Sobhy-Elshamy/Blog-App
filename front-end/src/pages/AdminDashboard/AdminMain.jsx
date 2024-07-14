import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";

// connect front with back 
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { getUsersCount } from "../../redux/apiCalls/profileApiCall";
import { getPostsCount } from "../../redux/apiCalls/postApiCall";
import { fetchAllComments } from "../../redux/apiCalls/commentApiCall";




const AdminMain = () => {
    // connect front with back
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);
    // get users count 
    const { usersCount } = useSelector(state => state.profile);
    // get post count
    const { postsCount } = useSelector(state => state.post);
    // get all comments
    const { comments } = useSelector(state => state.comment)
    
    // عايز اعرف عندنا كام category in this array => category length  

    useEffect(() => {
        dispatch(fetchCategories())
        // connect front with back 
        // get users count 
        dispatch(getUsersCount());
        // get posts count 
        dispatch(getPostsCount())
        // get all comments
        dispatch(fetchAllComments()) // take comment from comments state
    }, [])



    return(
        <div className="admin-main">
            <div className="admin-main-header">
                <div className="admin-main-card">
                    <h4 className="admin-card-title">Users</h4>
                    <div className="admin-card-count">
                        {usersCount}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link className="admin-card-link" to="/admin-dashboard/users-table">
                            See All Users
                        </Link>
                        <div className="admin-card-icon">
                            <i class="bi bi-file-earmark-person-fill"></i>
                        </div>
                    </div>
                </div>

                <div className="admin-main-card">
                    <h4 className="admin-card-title">Posts</h4>
                    <div className="admin-card-count">
                        {postsCount}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link className="admin-card-link" to="/admin-dashboard/posts-table">
                            See All Posts 
                        </Link>
                        <div className="admin-card-icon">
                            <i class="bi bi-stickies-fill"></i>
                        </div>
                    </div>
                </div>

                <div className="admin-main-card">
                    <h4 className="admin-card-title">Categories</h4>
                    <div className="admin-card-count">
                        {categories?.length}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link className="admin-card-link" to="/admin-dashboard/categories-table">
                            See All Categories  
                        </Link>
                        <div className="admin-card-icon">
                            <i class="bi bi-tags-fill"></i>
                        </div>
                    </div>
                </div>

                <div className="admin-main-card">
                    <h4 className="admin-card-title">Comments</h4>
                    <div className="admin-card-count">
                        {comments?.length}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link className="admin-card-link" to="/admin-dashboard/comments-table">
                            See All Comments  
                        </Link>
                        <div className="admin-card-icon">
                            <i class="bi bi-chat-left-text-fill"></i>
                        </div>
                    </div>
                </div>
            </div>

            <AddCategoryForm />
        </div>
    )
}

export default AdminMain;