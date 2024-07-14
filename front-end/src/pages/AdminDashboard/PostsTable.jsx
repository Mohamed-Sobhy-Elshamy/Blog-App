import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import './admin-table.css'
import swal from 'sweetalert';

// i need post => from dummyData
// import {posts} from '../../dummyData'

// connect front with back
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getAllPosts, deletePost } from "../../redux/apiCalls/postApiCall";


const PostsTable = () => {
    // connect front with back
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])


    // delete post handelr
    const deletePostsHandler = (postId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((isOk) => {
            if (isOk) {
            dispatch(deletePost(postId))
            } 
        });
    }


    return(
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Posts</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="same-bg">Count</th>
                            <th className="same-bg">User</th>
                            <th className="same-bg">Post Title</th>
                            <th className="same-bg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((item, index) => (
                            <tr key={item._id}>
                                <td className="item-count">{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img 
                                        src={item?.user?.profilePhoto?.url}
                                        alt="profile_photo" 
                                        className="table-user-image"
                                        />
                                        <span className="table-username">{item?.user?.username}</span>
                                    </div>
                                </td>
                                <td className="email">{item.title}</td>
                                <td>
                                    <div className="table-btn-group">
                                        <button>
                                            <Link to={`/posts/details/${item._id}`}>View Post</Link>
                                        </button>
                                        <button onClick={ () => deletePostsHandler(item._id)}>Delete Post</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default PostsTable;